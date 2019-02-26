import { LitElement, html, css } from 'lit-element';

// const unpkg = html`<svg id="Layer_1" data-name="unpkg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;}.cls-2{fill:#fff;}</style></defs><title>unpkg</title><rect x="0.5" y="0.5" width="49" height="49" rx="5"/><rect class="cls-1" x="0.5" y="0.5" width="49" height="49" rx="5"/><path class="cls-2" d="M38.29,34.56a11.63,11.63,0,0,1-2.81,4.11,13,13,0,0,1-4.41,2.67,16.32,16.32,0,0,1-5.73,1,16.24,16.24,0,0,1-5.75-1,12.42,12.42,0,0,1-4.34-2.67,11.59,11.59,0,0,1-2.74-4.11,14.25,14.25,0,0,1-1-5.33V9.09h7.76v19.5a9.35,9.35,0,0,0,.34,2.52,6.47,6.47,0,0,0,1.05,2.12,5,5,0,0,0,1.88,1.49,6.61,6.61,0,0,0,2.81.54,6.68,6.68,0,0,0,2.81-.54,5.18,5.18,0,0,0,1.89-1.49,5.78,5.78,0,0,0,1.05-2.12,9.77,9.77,0,0,0,.32-2.52V9.09h7.81V29.23A13.86,13.86,0,0,1,38.29,34.56Z" transform="translate(0)"></svg>`;
// const npm = html`<svg id="Layer_2" data-name="npm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.67 18.93"><defs><style>.cls-1{fill:#fff;}</style></defs><title>npm</title><path d="M.67,15.54H49.33V31.76H25v2.7H14.19v-2.7H.67Zm2.7,13.52H8.78V20.94h2.7v8.12h2.71V18.24H3.37ZM16.89,18.24V31.76H22.3v-2.7h5.4V18.24Zm5.41,2.7H25v5.41H22.3Zm8.11-2.7V29.06h5.4V20.94h2.71v8.12h2.7V20.94h2.71v8.12h2.7V18.24Z" transform="translate(-0.67 -15.54)"/><polygon class="cls-1" points="2.7 13.52 8.11 13.52 8.11 5.41 10.81 5.41 10.81 13.52 13.52 13.52 13.52 2.7 2.7 2.7 2.7 13.52"/><path class="cls-1" d="M16.89,18.24V31.76H22.3v-2.7h5.4V18.24ZM25,26.35H22.3V20.94H25Z" transform="translate(-0.67 -15.54)"/><polygon class="cls-1" points="29.74 2.7 29.74 13.52 35.15 13.52 35.15 5.41 37.85 5.41 37.85 13.52 40.55 13.52 40.55 5.41 43.26 5.41 43.26 13.52 45.96 13.52 45.96 2.7 29.74 2.7"></svg>`;
// const github = html`<svg id="Layer_3" data-name="github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.19 47"><defs><style>.cls-1{fill:#221e1b;fill-rule:evenodd;}</style></defs><title>github</title><path class="cls-1" d="M25,1.83a24.09,24.09,0,0,0-7.61,47C18.59,49,19,48.26,19,47.62s0-2.08,0-4.09c-6.7,1.45-8.11-3.23-8.11-3.23-1.1-2.79-2.68-3.53-2.68-3.53-2.19-1.49.17-1.46.17-1.46a5.08,5.08,0,0,1,3.69,2.48c2.15,3.68,5.64,2.62,7,2a5.13,5.13,0,0,1,1.53-3.22c-5.35-.61-11-2.67-11-11.91A9.3,9.3,0,0,1,12.1,18.2a8.73,8.73,0,0,1,.24-6.38s2-.65,6.63,2.47a22.85,22.85,0,0,1,12.06,0c4.6-3.12,6.62-2.47,6.62-2.47a8.68,8.68,0,0,1,.24,6.38,9.29,9.29,0,0,1,2.47,6.46c0,9.26-5.63,11.3-11,11.89A5.75,5.75,0,0,1,31,41c0,3.22,0,5.82,0,6.61s.43,1.4,1.66,1.16A24.1,24.1,0,0,0,25,1.83Z" transform="translate(-0.9 -1.83)"></svg>`;

class OwcCatalogItem extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      tags: { type: Array },
      size: { type: String },
      gzip: { type: String },
      version: { type: String },
      iframeDemo: {},
      codepen: {},
      owcType: {},
      links: { type: Object },
      unpkgRoot: {}
    };
  }

  constructor() {
    super();
    this.title = '';
    this.version = '';
    this.description = '';
    this.links = {};
    this.tags = [];
    this.iframeDemo = '';
    this.packageName = '';
    this.size = 0;
    this.gzip = 0;
    this.unpkgRoot = '';
  }

  connectedCallback() {
    super.connectedCallback();
    fetch(`https://bundlephobia.com/api/size?package=${this.title}@${this.version}`)
      .then(res => res.json())
      .then(res => {
        this.size = (res.size / 1000).toFixed(2);
        this.gzip = (res.gzip / 1000).toFixed(2);
      });
  }

  static get styles() {
    return [
      css`
        :host {
          --owc-blue: #217ff9;
          --owc-purple: #aa00ff;
          text-align: left;
          display: flex;
          flex: 1;
          flex-direction: column;
          padding-top: 50px;
          font-size: 15px;
        }

        h1 {
          color: var(--owc-blue);
          margin-top: 10px;
          margin-bottom: 10px;
          font-family: 'Roboto';
        }

        h1 a {
          color: var(--owc-blue);
          text-decoration: none;
        }

        h1 a:hover {
          text-decoration: underline;
        }

        .catalog-item {
          padding: 10px;
          background-color: white;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .catalog-item-top-row {
          display: flex;
          flex-direction: row;
        }

        .catalog-item-logos {
          flex: 1;
        }

        .catalog-item-pkgfobia {
          font-family: 'Roboto Mono';
          font-size: 13px;
          color: #c6c6c6;
        }

        .catalog-item-middle-row {
          display: flex;
          flex-direction: row;
          margin-top: 40px;
          margin-bottom: 40px;
        }
        .catalog-item-description {
          flex: 1;
          margin-right: 15px;
        }

        .catalog-item-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .catalog-item-buttons button {
          padding: 10px;
          background-color: var(--owc-purple);
          border: none;
          color: white;
          font-weight: 700;
          height: 33px;
          cursor: pointer;
          border-radius: 5px;
        }

        .catalog-item-buttons a {
          padding: 10px;
          background-color: var(--owc-purple);
          border: none;
          color: white;
          font-size: 11px;
          text-decoration: none;
          font-weight: 700;
          cursor: pointer;
          border-radius: 5px;
        }

        .catalog-item-buttons a:hover {
          background-color: #ab00ffa1;
        }

        .catalog-item-buttons button:hover {
          background-color: #ab00ffa1;
        }

        .catalog-item-buttons button {
          margin-right: 10px;
        }

        .catalog-item-bottom-row {
          display: flex;
        }

        .catalog-item-bottom-row span {
          font-family: 'Roboto mono';
          color: #c6c6c6;
        }

        .catalog-item-bottom-row ul {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          padding-top: 3px;
          padding-left: 3px;
        }

        .catalog-item-bottom-row li {
          white-space: nowrap;
          background-color: #dddddd;
          padding: 3px 10px 3px 10px;
          font-family: 'Roboto Mono';
          color: white;
          font-size: 8px !important;
          border-radius: 10px;
          list-style-type: none;
          font-size: 10px;
          margin: 0px 5px 5px 0px;
        }

        svg {
          width: 20px;
        }

        @media only screen and (max-width: 768px) {
          .catalog-item-top-row {
            flex-direction: column;
          }

          .catalog-item-middle-row {
            flex-direction: column;
            margin-top: 15px;
            margin-bottom: 15px;
          }

          .catalog-item-buttons {
            justify-content: center;
            margin-top: 15px;
            margin-bottom: 5px;
          }

          .catalog-item-description {
            padding-top: 40px;
            padding-bottom: 40px;
          }

          .catalog-item-logos {
            margin-bottom: 15px;
          }

          .catalog-item-buttons a {
            flex: 1;
            text-align: center;
          }

          .catalog-item-buttons form {
            flex: 1;
          }

          .catalog-item-buttons button {
            width: calc(100% - 10px);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <h1><a href="${this.links.npm}" target="_blank">${this.title}</a></h1>
      <div class="catalog-item">
        <div class="catalog-item-top-row">
          <div class="catalog-item-logos">
            <a href=${this.links.repository} target="_blank"><github-logo></github-logo></a>
            <a href=${this.unpkgRoot} target="_blank"><unpkg-logo></unpkg-logo></a>
            <a href=${this.links.npm} target="_blank"><npm-logo></npm-logo></a>
          </div>
          <div class="catalog-item-pkgfobia">
            ${this.size !== 0
              ? html`
                  ${this.size}kb (gzipped: ${this.gzip}kb)
                `
              : ''}
          </div>
        </div>

        <div class="catalog-item-middle-row">
          <div class="catalog-item-description">
            ${this.description}
          </div>
          <div class="catalog-item-buttons">
            <form action="https://codepen.io/pen/define" method="POST" target="_blank">
              <input type="hidden" name="data" value=${JSON.stringify(this.codepen)} />
              <button class="owc-button" type="submit">Playground</button>
            </form>
            <a href=${this.iframeDemo} target="_blank">Demo</a>
          </div>
        </div>

        <div class="catalog-item-bottom-row">
          <span>Tags: </span>
          <ul>
            ${this.tags.map(
              tag => html`
                <li>${tag}</li>
              `,
            )}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('owc-catalog-item', OwcCatalogItem);

class UnpkgLogo extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-right: 5px;
        display: inline-block;
        width: 20px;
        height: 20px;
        opacity: 0.3;
      }

      :host(:hover) {
        opacity: 1;
      }
    `;
  }

  render() {
    // eslint-disable-line
    return html`<svg id="Layer_1" data-name="unpkg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;}.cls-2{fill:#fff;}</style></defs><title>unpkg</title><rect x="0.5" y="0.5" width="49" height="49" rx="5"/><rect class="cls-1" x="0.5" y="0.5" width="49" height="49" rx="5"/><path class="cls-2" d="M38.29,34.56a11.63,11.63,0,0,1-2.81,4.11,13,13,0,0,1-4.41,2.67,16.32,16.32,0,0,1-5.73,1,16.24,16.24,0,0,1-5.75-1,12.42,12.42,0,0,1-4.34-2.67,11.59,11.59,0,0,1-2.74-4.11,14.25,14.25,0,0,1-1-5.33V9.09h7.76v19.5a9.35,9.35,0,0,0,.34,2.52,6.47,6.47,0,0,0,1.05,2.12,5,5,0,0,0,1.88,1.49,6.61,6.61,0,0,0,2.81.54,6.68,6.68,0,0,0,2.81-.54,5.18,5.18,0,0,0,1.89-1.49,5.78,5.78,0,0,0,1.05-2.12,9.77,9.77,0,0,0,.32-2.52V9.09h7.81V29.23A13.86,13.86,0,0,1,38.29,34.56Z" transform="translate(0)"></svg>`;
  }
}
customElements.define('unpkg-logo', UnpkgLogo);

class GithubLogo extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-right: 5px;
        display: inline-block;
        width: 20px;
        height: 20px;
        opacity: 0.3;
      }

      :host(:hover) {
        opacity: 1;
      }
    `;
  }

  render() {
    // eslint-disable-line
    return html`<svg id="Layer_3" data-name="github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.19 47"><defs><style>.cls-1{fill:#221e1b;fill-rule:evenodd;}</style></defs><title>github</title><path class="cls-1" d="M25,1.83a24.09,24.09,0,0,0-7.61,47C18.59,49,19,48.26,19,47.62s0-2.08,0-4.09c-6.7,1.45-8.11-3.23-8.11-3.23-1.1-2.79-2.68-3.53-2.68-3.53-2.19-1.49.17-1.46.17-1.46a5.08,5.08,0,0,1,3.69,2.48c2.15,3.68,5.64,2.62,7,2a5.13,5.13,0,0,1,1.53-3.22c-5.35-.61-11-2.67-11-11.91A9.3,9.3,0,0,1,12.1,18.2a8.73,8.73,0,0,1,.24-6.38s2-.65,6.63,2.47a22.85,22.85,0,0,1,12.06,0c4.6-3.12,6.62-2.47,6.62-2.47a8.68,8.68,0,0,1,.24,6.38,9.29,9.29,0,0,1,2.47,6.46c0,9.26-5.63,11.3-11,11.89A5.75,5.75,0,0,1,31,41c0,3.22,0,5.82,0,6.61s.43,1.4,1.66,1.16A24.1,24.1,0,0,0,25,1.83Z" transform="translate(-0.9 -1.83)"></svg>`;
  }
}
customElements.define('github-logo', GithubLogo);

class NpmLogo extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-right: 5px;
        display: inline-block;
        width: 35px;
        height: 20px;
        opacity: 0.3;
      }

      :host(:hover) {
        opacity: 1;
      }
    `;
  }

  render() {
    // eslint-disable-line
    return html`<svg id="Layer_2" data-name="npm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.67 22.93"><defs><style>.cls-1{fill:#fff;}</style></defs><title>npm</title><path d="M.67,15.54H49.33V31.76H25v2.7H14.19v-2.7H.67Zm2.7,13.52H8.78V20.94h2.7v8.12h2.71V18.24H3.37ZM16.89,18.24V31.76H22.3v-2.7h5.4V18.24Zm5.41,2.7H25v5.41H22.3Zm8.11-2.7V29.06h5.4V20.94h2.71v8.12h2.7V20.94h2.71v8.12h2.7V18.24Z" transform="translate(-0.67 -15.54)"/><polygon class="cls-1" points="2.7 13.52 8.11 13.52 8.11 5.41 10.81 5.41 10.81 13.52 13.52 13.52 13.52 2.7 2.7 2.7 2.7 13.52"/><path class="cls-1" d="M16.89,18.24V31.76H22.3v-2.7h5.4V18.24ZM25,26.35H22.3V20.94H25Z" transform="translate(-0.67 -15.54)"/><polygon class="cls-1" points="29.74 2.7 29.74 13.52 35.15 13.52 35.15 5.41 37.85 5.41 37.85 13.52 40.55 13.52 40.55 5.41 43.26 5.41 43.26 13.52 45.96 13.52 45.96 2.7 29.74 2.7"></svg>`;
  }
}
customElements.define('npm-logo', NpmLogo);
