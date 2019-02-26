import { LitElement, html, css } from 'lit-element';

import owcAppStyle from './owc-catalog.css.js';
import owcButtonStyles from './styles/owc-button.js';
import './components/owc-package-search';
import './components/owc-catalog-item';

class OwcApp extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  static get styles() {
    return [
      owcButtonStyles,
      owcAppStyle,
      css`
        h1 {
          font-family: 'Roboto Mono';
          text-align: center;
          margin-bottom: 5px;
        }

        .not-found {
          padding: 60px;
          text-align: center;
        }

        .items-wrapper {
          width: 60vw;
          margin: auto;
        }

        @media only screen and (max-width: 768px) {
          .items-wrapper {
            width: 100vw;
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this.data = [];
    this.query = '';
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URL(window.location.href).searchParams;
    if (params.get('q')) {
      this.search(params.get('q'), params.get('type'));
    }
  }

  render() {
    let list =
      this.query === ''
        ? html``
        : html`
            <div class="not-found">
              We could not find any web component for "${this.query}" and type "${this.wcType}".
              <br />
              If you want to add an component to this type see
              <a href="https://github.com/open-wc/catalog" target="_blank">help</a>.
            </div>
          `;

    if (this.data.length > 0) {
      list = this.data.map(
        item => {
          console.log(item);
          return html`
          <owc-catalog-item
            .title=${item.package.name}
            .version=${item.package.version}
            .tags=${item.package.keywords}
            .description=${item.package.description}
            .owcType=${item.owcType}
            .unpkgroot=${item.owcUnpkg.root}
            .iframedemo=${item.owcUnpkg.demoUrl}
            .codepen=${item.owcUnpkg.payload}
            .links=${item.package.links}
          >
          </owc-catalog-item>
        `},
      );
    }

    return html`
      <h1>Web Component Catalog</h1>
      <owc-package-search @package-search-submit=${this._onSearchSubmit}></owc-package-search>
      <main>
        <div class="items-wrapper">
          ${list}
        </div>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/open-wc">open-wc</a>.
      </p>
    `;
  }

  _onSearchSubmit(e) {
    this.search(e.detail.query, e.detail.filter);
  }

  async search(_query, _type) {
    const query = _query || '';
    const type = _type || '';

    this.query = query;
    this.wcType = type;
    const url = `/.netlify/functions/search?q=${query}&type=${type}`;
    const response = await fetch(url);
    const json = await response.json();
    this.data = Array.from(json.results);
  }
}

customElements.define('owc-catalog', OwcApp);
