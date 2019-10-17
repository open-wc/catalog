// import { forceReRender } from '@storybook/polymer';
import { html } from 'lit-html';
import mdx from './index.mdx';

import '../src/owc-cat-item.js';

export default {
  title: 'Item',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const single = () =>
  html`
    <owc-cat-item
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .githubStars=${312}
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;

export const three = () =>
  html`
    <owc-cat-item
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
    <owc-cat-item
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
    <owc-cat-item
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['haunted@4.x.x']}
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;

export const info = () =>
  html`
    <owc-cat-item
      .detailsTabIndex=${0}
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      show-details
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;

export const readme = () =>
  html`
    <owc-cat-item
      .detailsTabIndex=${1}
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      show-details
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;

export const demo = () =>
  html`
    <owc-cat-item
      .detailsTabIndex=${2}
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      show-details
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;

export const links = () =>
  html`
    <owc-cat-item
      .detailsTabIndex=${3}
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      show-details
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;

export const source = () =>
  html`
    <owc-cat-item
      .detailsTabIndex=${4}
      .name=${'test-wc-card'}
      .description=${'This is quite the button. You can click and hover it. Basically all you need and expect.'}
      show-details
      .demoUrl=${'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module'}
      .readme=${'# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic'}
      .size=${21189}
      .sizeGzip=${7034}
      .version=${'1.0.6'}
      .versionTime=${'2019-09-16T23:23:25.991Z'}
      .flattenedDependencies=${['lit-element@2.x.x']}
      .githubStars=${312}
      .unpkgUrl=${'https://unpkg.com/test-wc-card@0.0.6/'}
      .githubUrl=${'https://github.com/daKmoR/test-wc-card'}
      .npmUrl=${'https://www.npmjs.com/package/test-wc-card/v/0.0.6'}
      .bundlephobiaUrl=${'https://bundlephobia.com/result?p=test-wc-card@0.0.6'}
    ></owc-cat-item>
  `;
