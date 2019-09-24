/* eslint-disable no-console */
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.fauna.com/graphql';

// TODO: use just fetch
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    // Key Name/ID: Public Full Access
    authorization: 'Bearer fnADZViyjRACCwKie9EtJDoUOW2TCzFn0FzR5mH1',
  },
});

/**
 * Object => GraphQL query
 *
 * @param {mixed} obj
 * @return template string.
 */
const queryfy = obj => {
  if (typeof obj === 'number') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const props = obj.map(value => `${queryfy(value)}`).join(',');
    return `[${props}]`;
  }

  if (typeof obj === 'object') {
    const props = Object.keys(obj)
      .map(key => `${key}:${queryfy(obj[key])}`)
      .join(',');
    return `{${props}}`;
  }

  return JSON.stringify(obj);
};

export async function dbHasPackage(id) {
  const result = await graphQLClient.request(`
    query {
      packageById(id: "${id}") {
        data {
          _id
        }
      }
    }
  `);
  return result.packageById.data.length !== 0;
}

export async function dbGetPackage(id) {
  const result = await graphQLClient.request(`
    query {
      packageById(id: "${id}") {
        data {
          _id
          name
          description
          version
          module
          license
          size
          sizeGzip
          packageJsonString
          customElementsString
          githubStars
          githubWatchers
          githubForks
          githubUrl
          unpkgUrl
          npmUrl
          versionTime
          readme
          demoUrl
          flattenedDependencies
        }
      }
    }
  `);
  return result.packageById.data[0];
}

export async function dbDeletePackage(id) {
  const packageInfo = await dbGetPackage(id);
  await graphQLClient.request(`
    mutation {
      deletePackage(id: "${packageInfo._id}") {
        _id
      }
    }
  `);
}

export async function dbAddPackage(pkg) {
  const data = {
    id: `${pkg.name}@${pkg.version}`,
    name: pkg.name,
    version: pkg.version,
    packageJsonString: JSON.stringify(pkg.packageJson),
    customElementsString: JSON.stringify(pkg.customElements),
    unpkgUrl: `https://unpkg.com/${pkg.name}@${pkg.version}/`,
    npmUrl: `https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}`,
    flattenedDependencies: JSON.stringify(pkg.flattenedDependencies),
  };
  const addIfFound = [
    'description',
    'homepage',
    'licence',
    'module',
    'main',
    'size',
    'sizeGzip',
    'githubStars',
    'githubWatchers',
    'githubForks',
    'githubUrl',
    'versionTime',
    'readme',
    'demoUrl',
  ];
  addIfFound.forEach(item => {
    if (pkg[item] !== undefined) {
      data[item] = pkg[item];
    }
  });

  const query = `
    mutation createPackage {
      createPackage(
        data: ${queryfy(data)}
      ) {
        _id
      }
    }
  `;

  try {
    await graphQLClient.request(query);
  } catch (err) {
    console.log('## Could not execute `createPackage` on db', err);
  }
}
