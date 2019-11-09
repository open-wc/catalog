import { search, searchFilterDependencies } from './helpers/elastic.js';
import { dbGetPackage } from './helpers/db.js';

export async function handler(ev) {
  const { queryString, dependencies } = ev.queryStringParameters;

  // this normalizes the array handling of queryStringParameters
  // locally I get "foo" and ["foo", "bar"]
  // on netlify I get "foo" and "foo, bar"
  // TODO: move to separate function
  let dependenciesArray = dependencies;
  if (dependencies && !Array.isArray(dependencies)) {
    if (dependencies.includes(',')) {
      dependenciesArray = dependencies.split(',');
    } else {
      dependenciesArray = [dependencies];
    }
  }

  // 1. search in elasticsearch
  const result = dependencies
    ? await searchFilterDependencies(queryString, dependenciesArray)
    : await search(queryString);

  if (result.hits.total.value === 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ 'no-result': true }, null, 2),
    };
  }

  // 2. query faunadb for all returned elasticsearch ids
  const dbRequests = [];
  result.hits.hits.forEach(hit => {
    dbRequests.push(dbGetPackage(hit._source.id));
  });
  const filled = await Promise.all(dbRequests);

  // preprocess json encoded flattenDependencies
  // => do not want to add more collections to faunadb to keep it simple for now
  filled.forEach((pkg, i) => {
    filled[i].flattenedDependencies = JSON.parse(pkg.flattenedDependencies);
  });

  // 3. return db filled data
  return {
    statusCode: 200,
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
    }),
    body: JSON.stringify({ a: 'b' }),
  };
}
