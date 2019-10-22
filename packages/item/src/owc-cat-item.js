import { LitElement, html } from 'lit-element';

import '@github/time-elements';

import './remarkable-markdown.js';
import './owc-tabs.js';

import './logos/logo-github.js';
import './logos/logo-npm.js';
import './logos/logo-unpkg.js';

import owcCatItemStyle from './owc-cat-item.css.js';

const githubStar = html`
  <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
    <path
      fill-rule="evenodd"
      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
    ></path>
  </svg>
`;

export class OwcCatItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      description: { type: String },
      size: { type: String },
      sizeGzip: { type: String },
      version: { type: String },
      versionTime: { type: String },
      flattenedDependencies: { type: Array },
      npmUrl: { type: String },
      unpkgUrl: { type: String },
      githubStars: { type: Number },
      githubUrl: { type: String },
      bundlephobiaUrl: { type: String },
      demoUrl: { type: String },
      showDetails: { type: Boolean, attribute: 'show-details', reflect: true },
      detailsTabIndex: { type: Number },
    };
  }

  constructor() {
    super();
    /**
     * A flag which decided if to show the overview or details style
     */
    this.showDetails = false;
    /**
     * Index of the open details tab
     * 0. Info
     * 1. Readme
     * 2. Demo
     * 3. Links
     * 4. Source
     */
    this.detailsTabIndex = 1;
    /**
     * Url that get shown in the demo tab
     */
    this.demoUrl = '';
    /**
     * A list of all flattened dependencies with versions.
     *
     * e.g. ['lit-element@2.x.x', 'lit-element@2.1.x', ...]
     *
     * @type {string[]}
     */
    this.flattenedDependencies = [];
    /**
     * The name of the web component. Needs to have a "-" in it.
     */
    this.name = '';
    /**
     * A Semver Version like "1.0.1" or "2.11.40"
     */
    this.version = '';
    this.description = '';
    this.size = 0;
    this.sizeGzip = 0;
    this.unpkgUrl = '';
    this.npmUrl = '';
    this.githubStars = 0;
    this.githubUrl = '';
    this.bundlephobiaUrl = '';

    this.addEventListener('click', this._handleClick.bind(this));
  }

  get dependenciesCount() {
    return this.flattenedDependencies.length / 4;
  }

  _handleClick(ev) {
    const path = ev.composedPath();
    if (!path.includes(this.shadowRoot.querySelector('#details'))) {
      this.toggle(ev);
    }
    if (path.includes(this.shadowRoot.querySelector('#details h1'))) {
      this.toggle(ev);
    }
  }

  toggle(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.showDetails = !this.showDetails;
    this.dispatchEvent(new Event('showDetailsChanged'));
  }

  renderRegisteredTypes() {
    return html`
      ${this.flattenedDependencies.map(type => {
        switch (type) {
          case 'lit-element@2.x.x':
            return html`
              <a href="#"
                ><img src="https://img.shields.io/badge/lib-lit--element--2.x-orange.svg"
              /></a>
            `;
          case 'haunted@4.x.x':
            return html`
              <a href="#"
                ><img src="https://img.shields.io/badge/lib-haunted--4.x-blueviolet.svg"
              /></a>
            `;
          default:
            return html``;
        }
      })}
    `;
  }

  __syncDetailsTabIndex() {
    this.detailsTabIndex = this.shadowRoot.querySelector('owc-tabs').activeIndex;
    this.dispatchEvent(new Event('detailsTabIndexChanged'));
  }

  render() {
    return html`
      <div id="overview">
        <div id="info">
          <h1>
            <a href="#details">${this.name}@${this.version}</a>
          </h1>

          <div id="description">
            ${this.description}
          </div>

          <div id="badges">
            ${this.renderRegisteredTypes()}
          </div>
        </div>

        <div id="dependencies">
          <p class="big">${this.dependenciesCount}<span class="unit mobile">dep</span></p>
          <p class="small desktop" title="incl. nested dependencies">
            ${this.dependenciesCount === 1 ? 'dependency' : 'dependencies'}
          </p>
        </div>

        <div id="lastRelease">
          <p class="big">
            <time-ago datetime=${this.versionTime} class="mobile" format="micro"></time-ago>
            <time-ago datetime=${this.versionTime} class="desktop big--not-so-much"></time-ago>
            <span class="mobile unit">ago</span>
          </p>
          <p class="small">released <span class="desktop desktop--inline">on npm</span></p>
        </div>

        <div id="downloadsNpm">
          <p class="big">${'?'}<span class="unit mobile">dl</span></p>
          <p class="small desktop" title="in the last week">downloads on npm</p>
        </div>

        <div id="sizeGzip">
          <p class="big">${(this.sizeGzip / 1024).toFixed(2)}<span class="unit">kB</span></p>
          <p class="small desktop">size gzipped</p>
        </div>

        <div id="githubStars">
          <p class="big">${this.githubStars}<span class="unit">${githubStar}</span></p>
          <p class="small desktop">on Github</p>
        </div>
      </div>

      <div id="details">
        <h1 class="mobile">
          <a href="#details">${this.name}@${this.version}</a>
        </h1>

        <owc-tabs
          mode="display"
          .activeIndex=${this.detailsTabIndex}
          @activeIndexChanged=${this.__syncDetailsTabIndex}
        >
          <div slot="tab" class="mobile">Info</div>
          <div slot="tab-content" id="info-tab" class="mobile">
            <dl>
              <dt>Description</dt>
              <dd>${this.description}</dd>
              <dt>Badges</dt>
              <dd>${this.renderRegisteredTypes()}</dd>
              <dt>Size gzipped</dt>
              <dd>${(this.sizeGzip / 1024).toFixed(2)}</dd>
              <dt>Stars on Github</dt>
              <dd>${this.githubStars}</dd>
              <dt>Dependencies</dt>
              <dd>${this.dependenciesCount}</dd>
              <dt>Last release on npm</dt>
              <dd><time-ago datetime=${this.versionTime}></time-ago></dd>
              <dt>Downloads on npm</dt>
              <dd>?</dd>
            </dl>
          </div>

          <div slot="tab">Readme</div>
          <div slot="tab-content">
            <remarkable-markdown>
              <div slot="markdown-html"></div>
              <script type="text/markdown">
                ${this.readme}
              </script>
            </remarkable-markdown>
          </div>

          <div slot="tab">Demo</div>
          <div slot="tab-content">
            ${this.demoUrl
              ? html`
                  <a href=${this.demoUrl} target="_blank" class="fake-url-bar">${this.demoUrl}</a>
                  <iframe src=${this.demoUrl}></iframe>
                `
              : `No demo could be found at demo/index.html. Neither a demoUrl in package.json was found. You can do it like that ...`}
          </div>

          <div slot="tab">Links</div>
          <div slot="tab-content">
            <div id="links">
              <div class="link">
                <a target="_blank" href=${this.githubUrl}>
                  <logo-github class="link__logo"></logo-github>
                  <span class="link__label">Github</span>
                </a>
              </div>
              <div class="link">
                <a target="_blank" href=${this.npmUrl}>
                  <logo-npm class="link__logo"></logo-npm>
                  <span class="link__label">npm</span>
                </a>
              </div>
              <div class="link">
                <a target="_blank" href=${this.bundlephobiaUrl}>
                  <logo-bundlephobia class="link__logo"></logo-bundlephobia>
                  <span class="link__label">bundlephobia</span>
                </a>
              </div>
              <div class="link">
                <a target="_blank" href=${this.unpkgUrl}>
                  <logo-unpkg class="link__logo"></logo-unpkg>
                  <span class="link__label">unpkg</span>
                </a>
              </div>
            </div>
          </div>

          <div slot="tab">Source</div>
          <div slot="tab-content">
            <a href="${this.unpkgUrl}" target="_blank" class="fake-url-bar">${this.unpkgUrl}</a>
            <iframe src=${this.unpkgUrl}></iframe>
          </div>
        </owc-tabs>
      </div>
    `;
  }

  static get styles() {
    return [owcCatItemStyle];
  }
}

customElements.define('owc-cat-item', OwcCatItem);
