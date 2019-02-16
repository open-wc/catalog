import https from 'https';
import { generateUrl, processResponseJson, handleMocks } from '../lambda-helpers/helpers.js';

// const url = 'https://www.npmjs.com/search?q=keywords%3Aopen-wc';
// const url = 'https://api.npms.io/v2/search?q=keywords:open-wc';
const api = 'https://api.npms.io/v2/search';

// const keywords = ['web-components', 'web-component', 'polymer'];

export function handler(event, context, callback) {
  const { q: query, type } = event.queryStringParameters;
  if (handleMocks(query, callback)) {
    return;
  }

  const searchUrl = generateUrl(api, query, type);
  https
    .get(searchUrl, resp => {
      let data = '';
      resp.on('data', chunk => {
        data += chunk;
      });

      resp.on('end', () => {
        const jsonData = processResponseJson(JSON.parse(data));
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(processResponseJson(jsonData), null, 2),
        });
      });
    })
    .on('error', err => {
      console.log(`Error: ${err.message}`); // eslint-disable-line no-console
    });
}
