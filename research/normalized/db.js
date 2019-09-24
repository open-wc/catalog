/* eslint-disable no-console */
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.fauna.com/graphql';
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'Bearer fnADYc2oY-ACAjR9EnRZT2RrGt5FifqJDpT2UM8H',
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
          name
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
          customElements {
            data {
              name
            }
          }
        }
      }
    }
  `);
  return result.packageById.data;
}

export async function dbGetAllIdsForPackage(id) {
  const result = await graphQLClient.request(`
    query getAllIds {
      packageById(id: "${id}") {
        data {
          _id
          customElements {
            data {
              _id
              attributes {
                data {
                  _id
                  values {
                    data {
                      _id
                    }
                  }
                }
              }
              properties {
                data {
                  _id
                  values {
                    data {
                      _id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }  
  `);
  return result;
}

// TODO: split up this horrible giant function
export async function dbAddPackage(pkg) {
  const customElementsCreate = [];

  pkg.customElements.tags.forEach(tag => {
    const attributesCreate = [];
    tag.attributes.forEach(attribute => {
      const newAttribute = {
        name: attribute.name,
        type: attribute.type,
      };
      if (attribute.values) {
        newAttribute.values = { create: attribute.values };
      }
      attributesCreate.push(newAttribute);
    });
    const propertiesCreate = [];
    tag.properties.forEach(property => {
      const newProperty = {
        name: property.name,
        type: property.type,
      };
      if (property.attribute) {
        newProperty.attribute = property.attribute;
      }
      if (property.reflect) {
        newProperty.reflect = property.reflect;
      }
      if (property.values) {
        newProperty.values = { create: property.values };
      }
      propertiesCreate.push(newProperty);
    });

    const newTag = {
      id: `${tag.name}$${pkg.version}`,
      name: tag.name,
      attributes: {
        create: attributesCreate,
      },
      properties: {
        create: propertiesCreate,
      },
    };
    customElementsCreate.push(newTag);
  });

  const data = {
    id: `${pkg.name}$${pkg.version}`,
    name: pkg.name,
    version: pkg.version,
    packageJsonString: JSON.stringify(pkg.packageJson),
    customElementsString: JSON.stringify(pkg.customElements),
    customElements: {
      create: customElementsCreate,
    },
  };
  if (pkg.description) {
    data.description = pkg.description;
  }
  if (pkg.homepage) {
    data.homepage = pkg.homepage;
  }
  if (pkg.license) {
    data.license = pkg.license;
  }
  if (pkg.module) {
    data.module = pkg.module;
  }
  if (pkg.main) {
    data.main = pkg.main;
  }
  if (pkg.size) {
    data.size = pkg.size;
  }
  if (pkg.sizeGzip) {
    data.sizeGzip = pkg.sizeGzip;
  }

  const query = `
    mutation createPackage {
      createPackage(
        data: ${queryfy(data)}
      ) {
        name
        id
        _id
        customElements {
          data {
            id
            name
            attributes {
              data {
                name
                type
              }
            }
            properties {
              data {
                name
                type
                attribute
                reflect
              }
            }
          }
        }
      }
    }
  `;
  console.log(`Adding Package ${pkg.name}@${pkg.version}`);
  pkg.customElements.tags.forEach(tag => {
    console.log(`Adding CustomElement ${tag.name}`);
  });
  console.log('---');

  try {
    await graphQLClient.request(query);
  } catch (err) {
    console.log('## Could not execute `createPackage` on db', err);
  }
}
