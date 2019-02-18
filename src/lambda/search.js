import {
  generateUrl,
  processResponseJson,
  handleMocks,
  aRequest,
  shouldMock,
} from '../lambda-helpers/helpers.js';

// const url = 'https://www.npmjs.com/search?q=keywords%3Aopen-wc';
// const url = 'https://api.npms.io/v2/search?q=keywords:open-wc';
const api = 'https://api.npms.io/v2/search';

async function doRequest(url) {
  const data = await aRequest(url);
  const jsonData = await processResponseJson(JSON.parse(data));
  return jsonData;
}

export function handler(event, context, callback) {
  const { q: query, type } = event.queryStringParameters;

  if (shouldMock(query)) {
    handleMocks(query).then(mockData => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(mockData, null, 2),
      });
    });
  } else {
    const searchUrl = generateUrl(api, query, type);
    doRequest(searchUrl).then(jsonData => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(jsonData, null, 2),
      });
    });
  }
}
