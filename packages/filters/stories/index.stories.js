// import { forceReRender } from '@storybook/polymer';
import { html } from 'lit-html';
import mdx from './index.mdx';

import '../src/owc-cat-filters.js';

export default {
  title: 'Filters',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const standard = () =>
  html`
    <owc-cat-filters></owc-cat-filters>
  `;
