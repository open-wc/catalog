// import { forceReRender } from '@storybook/polymer';
import { html } from 'lit-html';
import mdx from './index.mdx';

import '../src/owc-cat-app.js';

// const fullReadme = '# \\<test-wc-card>\n\nThis webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.\n\n## Installation\n```bash\nnpm i test-wc-card\n```\n\n## Usage\n```html\n<script type="module">\n  import "test-wc-card/test-wc-card.js";\n</script>\n\n<test-wc-card></test-wc-card>\n```\n\n## Testing using karma (if applied by author)\n```bash\nnpm run test\n```\n\n## Testing using karma via browserstack (if applied by author)\n```bash\nnpm run test:bs\n```\n\n## Demoing using storybook (if applied by author)\n```bash\nnpm run storybook\n```\n\n## Linting (if applied by author)\n```bash\nnpm run lint\n```';

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

export const twoResults = () =>
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
        {
          name: 'another-important-wc',
          description: 'Quite nice actually. Doing stuff and such. Very helpful.',
          readme: '# Test Important Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic',
          size: 21189,
          sizeGzip: 7034,
          version: '2.5.1',
          versionTime: '2019-09-16T23:23:25.991Z',
          flattenedDependencies: ['haunted@4.x.x'],
          githubStars: 1512,
          demoUrl: 'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module',
          unpkgUrl: 'https://unpkg.com/test-wc-card@0.0.6/',
          githubUrl: 'https://github.com/daKmoR/test-wc-card',
          npmUrl: 'https://www.npmjs.com/package/test-wc-card/v/0.0.6',
          bundlephobiaUrl: 'https://bundlephobia.com/result?p=test-wc-card@0.0.6',
        },
        {
          name: 'something-different',
          description: 'Quite nice actually. Doing stuff and such. Very helpful.',
          readme: '# Test Important Component Card\n Absolute:\n- lovely\n- marvelous\n- fantastic',
          size: 21189,
          sizeGzip: 7034,
          version: '2.5.1',
          versionTime: '2019-09-16T23:23:25.991Z',
          flattenedDependencies: ['haunted@4.x.x'],
          githubStars: 1512,
          demoUrl: 'https://unpkg.com/test-wc-card@0.0.6/demo/index.html?module',
          unpkgUrl: 'https://unpkg.com/test-wc-card@0.0.6/',
          githubUrl: 'https://github.com/daKmoR/test-wc-card',
          npmUrl: 'https://www.npmjs.com/package/test-wc-card/v/0.0.6',
          bundlephobiaUrl: 'https://bundlephobia.com/result?p=test-wc-card@0.0.6',
        },
      ]}
    ></owc-cat-app>
  `;
