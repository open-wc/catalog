import { LitElement, html, css } from 'lit-element';

import 'wc-spinners/dist/semipolar-spinner.js';

import owcAppStyle from './owc-cat-app.css.js';
import '../../header/src/owc-cat-header.js';
import '../../intro/src/owc-cat-intro.js';
import '../../item/src/owc-cat-item.js';
import '../../filters/src/owc-cat-filters.js';
import '../../item/src/owc-tabs.js';

function isMobile() {
  return window.innerWidth < 600;
}

class OwcCatApp extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      intro: { type: Boolean },
      loading: { type: Boolean, reflect: true },
      showMobileDetail: { type: Boolean, reflect: true, attribute: 'show-mobile-detail' },
      detailsTabIndex: { type: Number },
    };
  }

  static get styles() {
    return [
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
      `,
    ];
  }

  constructor() {
    super();
    this.intro = true;
    this.loading = false;
    this.showMobileDetail = false;
    this.detailsTabIndex = 1;
    this.data = [];
    this.query = '';
    this.__firstSearch = true;

    this.shadowRoot.addEventListener('search', () => {
      this.search();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URL(window.location.href).searchParams;
    if (params.get('q')) {
      this.search(params.get('q'), params.get('type'));
    }
  }

  render() {
    let list = '';

    if (this.data.length > 0) {
      list = this.data.map(
        (item, i) => html`
          ${this.showMobileDetail
            ? html`
                <div slot="tab" class="pill">${item.name}</div>
              `
            : html``}
          <owc-cat-item
            .__catItemIndex=${i}
            slot="tab-content"
            @showDetailsChanged=${ev => {
              if (isMobile()) {
                const clickedItem = ev.target;
                this.showMobileDetail = clickedItem.showDetails;

                this.updateComplete.then(() => {
                  if (this.showMobileDetail) {
                    this.shadowRoot.querySelector('.items-wrapper').scrollIntoView();
                    this.shadowRoot.querySelector('owc-tabs').activeIndex =
                      clickedItem.__catItemIndex;
                  } else {
                    [...this.shadowRoot.querySelectorAll('owc-cat-item')][
                      clickedItem.__catItemIndex
                    ].scrollIntoView({ behavior: 'smooth' });
                  }
                });
              }
            }}
            @detailsTabIndexChanged=${ev => {
              if (isMobile()) {
                this.detailsTabIndex = ev.target.detailsTabIndex;
              }
            }}
            .name=${item.name}
            .description=${item.description}
            .version=${item.version}
            .versionTime=${item.versionTime}
            .flattenedDependencies=${item.flattenedDependencies}
            .size=${item.size}
            .sizeGzip=${item.sizeGzip}
            .githubStars=${item.githubStars}
            .githubUrl=${item.githubUrl}
            .npmUrl=${item.npmUrl}
            .unpkgUrl=${item.unpkgUrl}
            .bundlephobiaUrl=${item.bundlephobiaUrl}
            .readme=${item.readme}
            .demoUrl=${item.demoUrl}
            .showDetails=${this.showMobileDetail}
            .detailsTabIndex=${this.detailsTabIndex}
          >
          </owc-cat-item>
        `,
      );
    } else {
      list = html`
        <div class="not-found">
          We could not find any web component for "${this.header ? this.header.searchValue : '...'}
          ". Maybe too many filters are set?
          <br />
          In alpha phase you need to manually index packages via
          <a href="./add.html">add.html</a>.
          <br />
          You can learn more how you can index a webcomponent under
          <a href="https://github.com/open-wc/catalog" target="_blank">
            help
          </a>
          .
        </div>
      `;
      if (this.__firstSearch) {
        list = html``;
      }
    }

    return html`
      ${this.intro
        ? html`
            <owc-cat-intro @search=${this._introSearch}></owc-cat-intro>
          `
        : html`
            <owc-cat-header></owc-cat-header>
            <div id="content">
              <owc-cat-filters></owc-cat-filters>
              <main>
                <div id="loading">
                  <semipolar-spinner></semipolar-spinner>
                </div>

                <div class="items-wrapper">
                  ${this.showMobileDetail
                    ? html`
                        <owc-tabs
                          @activeIndexChanged=${() => {
                            if (isMobile()) {
                              this.shadowRoot.querySelector('.items-wrapper').scrollIntoView();
                            }
                          }}
                        >
                          ${list}
                        </owc-tabs>
                      `
                    : html`
                        ${list}
                      `}
                </div>
              </main>
            </div>

            <div class="app-footer">
              🚽 Made with love by
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/open-wc"
                >open-wc</a
              >.
            </div>
          `}
    `;
  }

  get header() {
    return this.shadowRoot.querySelector('owc-cat-header');
  }

  get filters() {
    return this.shadowRoot.querySelector('owc-cat-filters');
  }

  _introSearch(ev) {
    ev.stopPropagation();
    this.intro = false;
    const { searchValue } = this.shadowRoot.querySelector('owc-cat-intro');
    this.updateComplete.then(async () => {
      await this.header.updateComplete;
      this.header.searchValue = searchValue;
      this.search();
    });
  }

  async search() {
    this.loading = true;

    const data = new FormData(this.filters.formEl);
    data.append('queryString', this.header.searchValue);
    const urlParams = new URLSearchParams(data).toString();

    const url = `/.netlify/functions/search?${urlParams}`;
    const response = await fetch(url);
    const json = await response.json();
    this.data = Array.from(json);

    this.loading = false;
    this.__firstSearch = false;
  }
}

customElements.define('owc-cat-app', OwcCatApp);
