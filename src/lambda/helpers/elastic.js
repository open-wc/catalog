/* eslint-disable no-console, no-await-in-loop */

import fetch from 'node-fetch';

// // playground login
// const username = '6VWygp4joU';
// const password = '9NBHqCyR6EVxhWLu7tArK53F';

function elastic(_url, method = 'GET', body = null) {
  const url = `https://search-catalog-testing-xty6jjvifguawmpk2f7iop3b2a.us-east-2.es.amazonaws.com${_url}`;
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  };
  const options = { method, headers };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        console.error(JSON.stringify(err, null, 2));
        reject();
      });
  });
}

function elasticPut(_url, body) {
  return elastic(_url, 'PUT', body);
}

function elasticPost(_url, body) {
  return elastic(_url, 'POST', body);
}

function parseV2CustomElements(customElements) {
  const data = {
    tags: [],
  };

  customElements.tags.forEach(tag => {
    data.tags.push(tag.name);

    if (tag.attributes) {
      data.attributes = tag.attributes.reduce((acc, attr) => [...acc, attr.name], []);
    }
    if (tag.properties) {
      data.properties = tag.properties.reduce((acc, attr) => [...acc, attr.name], []);
    }
  });

  return data;
}

function createFlatSearchablePackage(pkg) {
  const flatPkg = {
    id: `${pkg.name}@${pkg.version}`,
    name: pkg.name,
    version: pkg.version,
    module: !!pkg.module,
    main: !!pkg.main,
    hasDemo: !!pkg.demoUrl,
  };
  if (pkg.customElements && pkg.customElements.version === 2) {
    Object.assign(flatPkg, parseV2CustomElements(pkg.customElements));
  }

  const addIfFound = [
    'description',
    'homepage',
    'licence',
    'size',
    'sizeGzip',
    'githubStars',
    'githubWatchers',
    'githubForks',
    'versionTime',
    'readme',
    'flattenedDependencies',
  ];
  addIfFound.forEach(item => {
    if (pkg[item] !== undefined) {
      flatPkg[item] = pkg[item];
    }
  });

  return flatPkg;
}

export async function searchUpdatePackage(pkg) {
  const searchablePkg = createFlatSearchablePackage(pkg);

  const result = await elasticPut(`/packages/_doc/${pkg.name}`, searchablePkg);
  if (result && result.error) {
    console.error(result.error);
    throw new Error('Could not index file');
  }
  return result;
}

export async function search(queryString) {
  const result = await elasticPost('/packages/_search', {
    query: {
      multi_match: {
        query: queryString,
        fields: ['name^4', 'description^2', 'homepage', 'tags', 'attributes', 'properties'],
        fuzziness: 3,
        prefix_length: 1,
      },
    },
  });
  return result;
}

export async function searchFilterDependencies(queryString, dependencies) {
  const should = dependencies.map(dep => ({
    match_phrase: {
      flattenedDependencies: {
        query: dep,
      },
    },
  }));

  const filter = {
    bool: {
      should,
    },
  };

  const result = await elasticPost('/packages/_search', {
    query: {
      bool: {
        must: {
          multi_match: {
            query: queryString,
            fields: ['name^4', 'description^2', 'homepage', 'tags', 'attributes', 'properties'],
            fuzziness: 3,
            prefix_length: 1,
          },
        },
        filter,
      },
    },
  });
  return result;
}
