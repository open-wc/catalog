import fetch from 'node-fetch';
import https from 'https';

// TODO: use fetch
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

export function aTimeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function githubRequest(_url) {
  const url = `https://api.github.com${_url}`;
  const headers = {
    'User-Agent': 'open-wc calendar',
  };
  const options = { method: 'GET', headers };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(err, null, 2));
        reject();
      });
  });
}
