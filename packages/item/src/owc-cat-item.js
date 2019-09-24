import { LitElement, html, css } from 'lit-element';

import '@github/time-elements';

import './remarkable-markdown.js';
import './owc-tabs.js';

import './logos/logo-github.js';
import './logos/logo-npm.js';
import './logos/logo-unpkg.js';

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
     * 0. Readme
     * 1. Demo
     * 2. Links
     * 3. Source
     */
    this.detailsTabIndex = 0;
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

  _handleClick(ev) {
    if (!ev.path.includes(this.shadowRoot.querySelector('#details'))) {
      this.toggle(ev);
    }
  }

  toggle(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.showDetails = !this.showDetails;
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

  render() {
    return html`
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

      <div id="lastRelease">
        <p class="big big--not-so-much">
          <time-ago datetime=${this.versionTime}></time-ago>
        </p>
        <p class="small desktop">released on npm</p>
      </div>

      <div id="downloadTime">
        <p class="big">
          ${((this.sizeGzip / 1024 / 30) * 1000).toFixed(2)}<span class="unit">ms</span>
        </p>
        <p class="small desktop" title="3G 50kB/s">download time</p>
      </div>

      <div id="sizeGzip">
        <p class="big">${(this.sizeGzip / 1024).toFixed(2)}<span class="unit">kB</span></p>
        <p class="small desktop">size gzipped</p>
      </div>

      <div id="githubStars">
        <p class="big">${this.githubStars}<span class="unit">${githubStar}</span></p>
        <p class="small desktop">on Github</p>
      </div>

      <div id="details">
        <owc-tabs .activeIndex=${this.detailsTabIndex}>
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
    return [
      css`
        :host {
          --owc-blue: #217ff9;
          --owc-purple: #aa00ff;
          text-align: left;
          display: grid;
          margin-bottom: 15px;
          font-size: 15px;
          padding: 15px;
          background-color: white;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
          align-items: center;
          min-height: 85px;
          box-sizing: border-box;
        }

        h1 {
          color: var(--owc-blue);
          margin-top: 0;
          margin-bottom: 10px;
          margin-right: 30px;
          font-family: 'Roboto';
          font-size: 22px;
        }

        h1 a {
          color: var(--owc-blue);
          text-decoration: none;
        }

        h1 a:hover {
          text-decoration: underline;
        }

        .big {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .big--not-so-much {
          font-size: 20px;
        }

        .small {
          font-size: 13px;
        }

        .unit {
          color: #777;
          fill: #777;
          font-size: 18px;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        p {
          margin: 0;
          text-align: center;
        }

        iframe {
          width: 100%;
          border: none;
          height: 60vh;
        }

        #badges {
          margin-top: 10px;
        }

        .desktop {
          display: none;
        }

        #details {
          display: none;
        }

        :host([show-details]) #details {
          display: block;
        }

        :host([show-details]) h1 {
          margin-bottom: 0;
        }

        :host([show-details]) #lastRelease,
        :host([show-details]) #downloadTime,
        :host([show-details]) #sizeGzip,
        :host([show-details]) #githubStars,
        :host([show-details]) #description,
        :host([show-details]) #badges {
          display: none;
        }

        /* Grid */

        #info {
          grid-area: info;
        }

        #lastRelease {
          grid-area: lastRelease;
          min-width: 100px;
        }

        #downloadTime {
          grid-area: downloadTime;
        }

        #sizeGzip {
          grid-area: sizeGzip;
        }

        #githubStars {
          grid-area: githubStars;
        }

        #details {
          grid-area: details;
        }

        #links {
          display: grid;
          grid-template-columns: 130px 130px;
          grid-gap: 28px;
        }

        .link {
          border: 1px solid #ccc;
          width: 130px;
          height: 130px;
        }

        .link a {
          display: flex;
          flex-flow: column;
          height: 100%;
          align-items: center;
          justify-content: center;
        }

        .link__logo {
          width: 70px;
          height: 70px;
          margin-bottom: 10px;
        }

        :host {
          grid-gap: 5px;
          grid-template-areas:
            'info info'
            'lastRelease githubStars'
            'downloadTime sizeGzip';
        }

        :host([show-details]) {
          grid-template-areas:
            'info info'
            'lastRelease githubStars'
            'downloadTime sizeGzip'
            'details details';
        }

        .fake-url-bar {
          border: 7px solid #929292;
          display: block;
          padding: 5px;
        }

        @media only screen and (min-width: 768px) {
          h1 {
            font-size: 26px;
          }

          #links {
            grid-template-columns: 130px 130px 130px 130px;
          }

          :host {
            border-radius: 10px;
            grid-gap: 20px;
            grid-template-areas: 'info lastRelease downloadTime sizeGzip githubStars';
          }

          :host([show-details]) {
            grid-template-areas:
              'info lastRelease downloadTime sizeGzip githubStars'
              'details details details details details';
          }

          :host([show-details]) h1 {
            margin-bottom: 10px;
          }

          :host([show-details]) #lastRelease,
          :host([show-details]) #downloadTime,
          :host([show-details]) #sizeGzip,
          :host([show-details]) #githubStars,
          :host([show-details]) #description,
          :host([show-details]) #badges {
            display: block;
          }

          .desktop {
            display: block;
          }
        }
      `,
    ];
  }
}

customElements.define('owc-cat-item', OwcCatItem);
