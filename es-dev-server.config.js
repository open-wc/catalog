const proxy = require('koa-proxies');

module.exports = {
  port: 8080,
  middlewares: [
    proxy('/.netlify/functions/', {
      target: 'http://localhost:9000',
      rewrite: path => path.replace(/^\/\\.netlify\/functions/, ''),
    }),
  ],
};
