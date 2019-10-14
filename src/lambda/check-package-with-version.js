/* eslint-disable no-console, no-await-in-loop */
import semver from 'semver';

import { aRequest, aTimeout, githubRequest } from './helpers/helpers.js';
import { dbAddPackage, dbHasPackage, dbDeletePackage } from './helpers/db.js';
import { searchUpdatePackage } from './helpers/elastic.js';
import { npmIsValidVersion, isLatestNpmVersion } from './helpers/npm.js';

const customElementsFile = 'custom-elements.json';

function isValidPackageId(_id) {
  let id = _id;
  if (!id) {
    return false;
  }
  if (id[0] === '@') {
    // remove npm scope @
    id = id.substr(1);
  }
  return id.includes('@');
}

async function getSizes(name, version) {
  const result = await aRequest(`https://bundlephobia.com/api/size?package=${name}@${version}`);
  const data = JSON.parse(result);
  return {
    size: data.size,
    sizeGzip: data.gzip,
    dependencySizes: data.dependencySizes,
  };
}

// TODO: get downloads from NPM
// https://github.com/npm/registry/blob/master/docs/download-counts.md

// TODO: will need to rotate Github API keys because of rate limits
// potentially switch to v4 API with GraphQL (rate limits are worse so only if queried info is worth it)
// https://developer.github.com/v4/explorer/
async function getGithubInfo(pkg) {
  if (pkg.repository && pkg.repository.url && pkg.repository.url.includes('github.com/')) {
    const { url } = pkg.repository;
    const start = url.indexOf('github.com/') + 11;
    const end = url.lastIndexOf('.git');
    const repoName = url.substring(start, end);

    const data = await githubRequest(`/repos/${repoName}`);
    return {
      githubUrl: `https://github.com/${repoName}`,
      githubStars: data.stargazers_count,
      githubWatchers: data.watchers_count,
      githubForks: data.forks_count,
      githubOpenIssues: data.open_issues_count,
      githubLastPush: data.pushed_at,
    };
  }
  return {};
}

function flattenDependencies(deps) {
  const flattened = [];
  Object.keys(deps).forEach(dep => {
    const val = deps[dep];
    const versionData = semver.minVersion(val);
    flattened.push(`${dep}@${versionData.major}.x.x`);
    flattened.push(`${dep}@${versionData.major}.${versionData.minor}.x`);
    flattened.push(`${dep}@${versionData.major}.${versionData.minor}.${versionData.patch}`);
    flattened.push(`${dep}@${val}`);
  });
  return flattened;
}

async function getDemoUrl(packageJson) {
  const { name, version, demoUrl } = packageJson;
  if (demoUrl) {
    return demoUrl;
  }
  const potentialDemoUrl = `https://unpkg.com/${name}@${version}/demo/index.html?module`;
  const demoResponse = await aRequest(potentialDemoUrl);
  let findDemoUrl = '';
  if (demoResponse !== `Cannot find "/demo/index.html" in ${name}@${version}`) {
    findDemoUrl = potentialDemoUrl;
  }
  return findDemoUrl;
}

export async function handler(ev) {
  const { id } = ev.queryStringParameters;

  if (!isValidPackageId(id)) {
    return {
      statusCode: 200,
      body: `"${id}" is not valid. Format is like "my-npm-package@1.0.0" or "my-scope@my-npm-package@1.0.0"`,
    };
  }

  const splitIndex = id.lastIndexOf('@');
  const name = id.substr(0, splitIndex);
  const version = id.substr(splitIndex + 1);
  const ceFileUrl = `https://unpkg.com/${name}@${version}/${customElementsFile}`;
  const npmMetaDataUrl = `https://registry.npmjs.org/${name}`;
  const packageMetaDataString = await aRequest(npmMetaDataUrl);
  const packageMetaData = JSON.parse(packageMetaDataString);

  if (!npmIsValidVersion(packageMetaData, version)) {
    return {
      statusCode: 200,
      body: `Version ${version} for "${name}" could not be found. Are you sure it is published?`,
    };
  }

  let unpkgResponse;
  // if unpkg does not have the package yet then wait/fetch with increasing intervales
  try {
    const timeouts = [10, 100, 1000, 2000];
    unpkgResponse = await aRequest(ceFileUrl);
    if (unpkgResponse === `Cannot find package ${name}@${version}`) {
      let i = 0;
      do {
        unpkgResponse = await aRequest(ceFileUrl);
        await aTimeout(timeouts[i]);
        i += 1;
      } while (unpkgResponse === `Cannot find package ${name}@${version}` && i < timeouts.length);
    }
    if (unpkgResponse === `Cannot find package ${name}@${version}`) {
      return {
        statusCode: 200,
        body: `Package "${name}@${version}" was not found. Is it published? We checked via https://unpkg.com/${name}@${version}/`,
      };
    }
  } catch (err) {
    return {
      statusCode: 200,
      body: `We could not reach unpkg.com. Please try again later.`,
    };
  }

  if (unpkgResponse === `Cannot find "/${customElementsFile}" in ${name}@${version}`) {
    return {
      statusCode: 200,
      body: `Package "${name}@${version}" does not have a ${customElementsFile} and can therefore not be added to the web components catalog.`,
    };
  }

  if (unpkgResponse[0] === '{') {
    const packageJson = packageMetaData.versions[version];
    const customElements = JSON.parse(unpkgResponse);
    let body = `The package "${id}" got processed:`;

    const sizes = await getSizes(name, version);
    const githubInfo = await getGithubInfo(packageJson);
    const readme = await aRequest(`https://unpkg.com/${name}@${version}/README.md`);
    const demoUrl = await getDemoUrl(packageJson);

    const pkg = {
      ...packageJson,
      ...sizes,
      ...githubInfo,
      readme,
      demoUrl,
      versionTime: packageMetaData.time[version],
      customElements,
      packageJson,
      // TODO: gather nested dependencies instead of using packageJson.dependencies
      // mimic https://github.com/npm/npm-remote-ls/blob/master/lib/remote-ls.js without all the heavy dependencies
      flattenedDependencies: flattenDependencies(
        packageJson.dependencies ? packageJson.dependencies : {},
      ),
    };

    if (!(await dbHasPackage(id))) {
      await dbAddPackage(pkg);
      body += `- added to database`;
    } else {
      await dbDeletePackage(id);
      await dbAddPackage(pkg);
      body += `- updated in database`;
    }

    // TODO: better heuristic? check for version in elastic if lower then updated
    // even if not latest... is that better?
    if (isLatestNpmVersion(packageMetaData, version)) {
      await searchUpdatePackage(pkg);
      body += `- updated search index (as this is the latest version)`;
    }

    return {
      statusCode: 200,
      body,
    };
  }

  return {
    statusCode: 200,
    body: `Unknown error - something went seriously wrong :/ please file an issue.`,
  };
}
