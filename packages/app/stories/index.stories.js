// import { forceReRender } from '@storybook/polymer';
import { html } from 'lit-html';
import mdx from './index.mdx';

import '../src/owc-cat-app.js';

export default {
  title: 'App',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const standard = () =>
  html`
    <owc-cat-app></owc-cat-app>
  `;

export const loadingFirstTime = () =>
  html`
    <owc-cat-app .intro=${false} .loading=${true}></owc-cat-app>
  `;

export const loading = () =>
  html`
    <owc-cat-app
      .intro=${false}
      .loading=${true}
      .data=${[
        {
          name: 'test-wc-card',
          description:
            'This is quite the button. You can click and hover it. Basically all you need and expect.',
          readme: '# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic',
          size: 21189,
          sizeGzip: 7034,
          version: '1.0.6',
          versionTime: '2019-09-16T23:23:25.991Z',
          flattenedDependencies: ['lit-element@2.x.x'],
          githubStars: 312,
          demoUrl: 'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module',
          unpkgUrl: 'https://unpkg.com/test-wc-card@0.0.6/',
          githubUrl: 'https://github.com/daKmoR/test-wc-card',
          npmUrl: 'https://www.npmjs.com/package/test-wc-card/v/0.0.6',
          bundlephobiaUrl: 'https://bundlephobia.com/result?p=test-wc-card@0.0.6',
        },
      ]}
    ></owc-cat-app>
  `;

export const singleResult = () =>
  html`
    <owc-cat-app
      .intro=${false}
      .data=${[
        {
          name: 'test-wc-card',
          description:
            'This is quite the button. You can click and hover it. Basically all you need and expect.',
          readme: '# Test Web Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic',
          size: 21189,
          sizeGzip: 7034,
          version: '1.0.6',
          versionTime: '2019-09-16T23:23:25.991Z',
          flattenedDependencies: ['lit-element@2.x.x'],
          githubStars: 312,
          demoUrl: 'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module',
          unpkgUrl: 'https://unpkg.com/test-wc-card@0.0.6/',
          githubUrl: 'https://github.com/daKmoR/test-wc-card',
          npmUrl: 'https://www.npmjs.com/package/test-wc-card/v/0.0.6',
          bundlephobiaUrl: 'https://bundlephobia.com/result?p=test-wc-card@0.0.6',
        },
      ]}
    ></owc-cat-app>
  `;
