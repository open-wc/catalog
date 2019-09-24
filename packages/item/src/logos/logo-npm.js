import { LitElement, html, css } from 'lit-element';

class LogoNpm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    `;
  }

  // eslint-disable-next-line
  render() {
    return html`<svg id="Layer_2" data-name="npm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.67 22.93"><defs><style>.cls-1{fill:#fff;}</style></defs><title>npm</title><path d="M.67,15.54H49.33V31.76H25v2.7H14.19v-2.7H.67Zm2.7,13.52H8.78V20.94h2.7v8.12h2.71V18.24H3.37ZM16.89,18.24V31.76H22.3v-2.7h5.4V18.24Zm5.41,2.7H25v5.41H22.3Zm8.11-2.7V29.06h5.4V20.94h2.71v8.12h2.7V20.94h2.71v8.12h2.7V18.24Z" transform="translate(-0.67 -15.54)"/><polygon class="cls-1" points="2.7 13.52 8.11 13.52 8.11 5.41 10.81 5.41 10.81 13.52 13.52 13.52 13.52 2.7 2.7 2.7 2.7 13.52"/><path class="cls-1" d="M16.89,18.24V31.76H22.3v-2.7h5.4V18.24ZM25,26.35H22.3V20.94H25Z" transform="translate(-0.67 -15.54)"/><polygon class="cls-1" points="29.74 2.7 29.74 13.52 35.15 13.52 35.15 5.41 37.85 5.41 37.85 13.52 40.55 13.52 40.55 5.41 43.26 5.41 43.26 13.52 45.96 13.52 45.96 2.7 29.74 2.7"></svg>`;
  }
}
customElements.define('logo-npm', LogoNpm);
