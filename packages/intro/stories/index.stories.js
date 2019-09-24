// import { forceReRender } from '@storybook/polymer';
import { html } from 'lit-html';
import mdx from './index.mdx';

import '../src/owc-cat-intro.js';

export default {
  title: 'Intro',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const standard = () =>
  html`
    <owc-cat-intro></owc-cat-intro>
  `;
