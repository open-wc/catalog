// import { forceReRender } from '@storybook/polymer';
import { html } from 'lit-html';
import mdx from './index.mdx';

import '../src/owc-cat-header.js';

export default {
  title: 'Header',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const standard = () =>
  html`
    <owc-cat-header></owc-cat-header>
  `;
