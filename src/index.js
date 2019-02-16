import loadPolyfills from '@open-wc/polyfills-loader'; // eslint-disable-line

loadPolyfills().then(() => {
  import('./owc-catalog.js');
});
