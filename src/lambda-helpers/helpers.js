import https from 'https';
import { keywords, wcTypes } from '../values.js';
import mockSingle from '../mocks/single.js';
import mocks from '../mocks/mocks';

export const aRequest = url =>
  new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = '';
        resp.on('data', chunk => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', err => {
        reject(err.message);
      });
  });

export const generateUrl = (api, query, type = '') => {
  let keywordsString = keywords.join(',');
  if (type !== '') {
    keywordsString = type;
  }
  const result = `${api}?q=keywords:${keywordsString} ${query}`;
  return result;
};

async function loadDemoUrl(meta, demoUrl) {
  meta.owcDemoFullHtml = await aRequest(demoUrl); // eslint-disable-line no-param-reassign
  if (meta.owcDemoFullHtml) {
    // eslint-disable-next-line no-param-reassign
    meta.owcUnpkg.payload = {
      title: 'New Pen!',
      html: meta.owcDemoFullHtml.replace('"../', `"${meta.owcUnpkg.root}`), // TODO: needs to be better extracted
    };
  }
}

export const processResponseJson = async json => {
  /* eslint-disable no-param-reassign */
  const promises = [];

  const processed = json;
  if (processed.results) {
    processed.results.forEach((meta, key) => {
      meta.owcUnpkg = {};
      meta.owcUnpkg.root = `https://www.unpkg.com/${meta.package.name}@${meta.package.version}/`;
      meta.owcUnpkg.url = `${meta.owcUnpkg.root}?module`;

      if (meta.package.keywords) {
        for (let i = 0; i < wcTypes.length; i += 1) {
          if (meta.package.keywords.includes(wcTypes[i].key)) {
            const processedMeta = processed.results[key];
            processedMeta.owcType = wcTypes[i].key;

            // set demo url only for "special keywords"
            meta.owcUnpkg.demoUrl = `${meta.owcUnpkg.root}demo/index.html?module`;

            promises.push(loadDemoUrl(processed.results[key], processedMeta.owcUnpkg.demoUrl));
            break;
          }
        }
      }
    });
  }

  await Promise.all(promises);

  return processed;
  /* eslint-enable no-param-reassign */
};

export const shouldMock = query => query === '::mock-single' || query === '::mocks';

export const handleMocks = async query => {
  let mock = false;
  switch (query) {
    case '::mock-single':
      mock = mockSingle;
      break;
    case '::mocks':
      mock = mocks;
      break;
    default:
      mock = false;
  }

  if (mock) {
    return processResponseJson(mock.default);
  }

  return false;
};
