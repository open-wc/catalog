import { LitElement, html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import owcAppStyle from './owc-catalog.css.js';
import openWcLogo from './icons/open-wc-logo.js';
import githubIcon from './icons/github.js';
import npmIcon from './icons/npm.js';
import { wcTypes } from './values.js';

const renderType = (type = '') => {
  const wcType = wcTypes.find(el => el.key === type);
  return html`
    <a class="link link--type" href=${wcType.url} title=${wcType.label}>
      ${unsafeHTML(wcType.icon)}
    </a>
  `;
};

const renderTags = (tags = []) => {
  if (tags.length === 0) {
    return html`
      <span>no tags</span>
    `;
  }
  return tags.map(
    tag => html`
      <a class="link link--tag" href=${`./q=keywords:${tag}`}>
        ${tag}
      </a>
    `,
  );
};

const openCodePen = item => {
  if (item.owcUnpkg.payload) {
    return html`
      <form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value=${JSON.stringify(item.owcUnpkg.payload)} />
        <input type="submit" value="Create New Pen with Prefilled Data" />
      </form>
    `;
  }
  return html``;
};

const iframeDemo = item => {
  if (item.owcType) {
    return html`
      <iframe src=${item.owcUnpkg.demoUrl}></iframe>
    `;
  }
  return html``;
};

class OwcApp extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  get searchElement() {
    return this.shadowRoot.querySelector('input');
  }

  get typeElement() {
    return this.shadowRoot.querySelector('select');
  }

  constructor() {
    super();
    this.data = [];
    this.query = '';
  }

  static get styles() {
    return owcAppStyle;
  }

  render() {
    let list =
      this.query === ''
        ? html``
        : html`
            We could not find any web component for "${this.query}" and type "${this.wcType}".
            <br />
            If you want to add an component to this type see
            <a href="https://github.com/open-wc/catalog" target="_blank">help</a>.
          `;
    if (this.data.length > 0) {
      list = this.data.map(
        item => html`
          <div class="package">
            <div class="package__title">
              <a class="title__name" href=${item.package.links.npm} target="_blank">
                ${item.package.name}
              </a>
              <div class="package__links">
                <a
                  class="links__link"
                  title="View on GitHub"
                  href=${item.package.links.repository}
                  target="_blank"
                >
                  ${unsafeHTML(githubIcon)}
                </a>
                <a
                  class="links__link"
                  title="View on UNPKG"
                  href=${item.owcUnpkg.url}
                  target="_blank"
                >
                  U
                </a>
                <a
                  class="links__link"
                  title="View on npm"
                  href=${item.package.links.npm}
                  target="_blank"
                >
                  ${unsafeHTML(npmIcon)}
                </a>
              </div>
            </div>
            <div class="package__content">
              ${item.package.description} ${iframeDemo(item)} ${openCodePen(item)}
            </div>
            <div class="package__footer">
              <div class="package__type">
                <span>Type:</span>
                ${renderType(item.owcType)}
              </div>
              <div class="package__tags">
                <span>Tags:</span>
                ${renderTags(item.package.keywords)}
              </div>
            </div>
          </div>
        `,
      );
    }

    const typeOptions = wcTypes.map(
      type =>
        html`
          <option value=${type.key}>${type.label}</option>
        `,
    );

    return html`
      <header class="app-header">
        ${unsafeHTML(openWcLogo)}
        <h1>Custom Element Catalog</h1>
      </header>
      <main>
        <form>
          <input type="text" value="button" />
          <button @click=${this._search}>search</button>
          <select name="type">
            ${typeOptions}
          </select>
          <a href="https://github.com/open-wc/catalog" target="_blank">help</a>
        </form>
        <div>
          ${list}
        </div>
      </main>
      <p class="app-footer">
        🚽 Made with love by
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/open-wc">open-wc</a>.
      </p>
    `;
  }

  _search(ev) {
    ev.preventDefault();
    this.search(this.searchElement.value, this.typeElement.value);
  }

  async search(query, type) {
    this.query = query;
    this.wcType = type;
    const url = `/.netlify/functions/search?q=${query}&type=${type}`;
    const response = await fetch(url);
    const json = await response.json();
    this.data = Array.from(json.results);
  }
}

customElements.define('owc-catalog', OwcApp);
