import { keywords, wcTypes } from '../values.js';

export const generateUrl = (api, query, type = '') => {
  let keywordsString = keywords.join(',');
  if (type !== '') {
    keywordsString = type;
  }
  const result = `${api}?q=keywords:${keywordsString} ${query}`;
  return result;
};

export const processResponseJson = json => {
  const processed = json;
  if (processed.results) {
    processed.results.forEach((meta, key) => {
      if (meta.package.keywords) {
        for (let i = 0; i < wcTypes.length; i += 1) {
          if (meta.package.keywords.includes(wcTypes[i].key)) {
            processed.results[key].owcType = wcTypes[i].key;
            break;
          }
        }
      }
    });
  }
  return processed;
};

export const handleMocks = (query, callback) => {
  let mock = false;
  switch (query) {
    case '::mock-single':
      mock = require('../mocks/single.js'); // eslint-disable-line
      break;
    case '::mocks':
      mock = require('../mocks/three.js'); // eslint-disable-line
      break;
    default:
      mock = false;
  }
  if (mock) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(processResponseJson(mock.default), null, 2),
    });
    return true;
  }

  return false;
};
