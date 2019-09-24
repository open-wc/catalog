import { LitElement, html, css } from 'lit-element';

class LogoUnpkg extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  // eslint-disable-next-line
  render() {
    return html`<svg id="Layer_1" data-name="unpkg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;}.cls-2{fill:#fff;}</style></defs><title>unpkg</title><rect x="0.5" y="0.5" width="49" height="49" rx="5"/><rect class="cls-1" x="0.5" y="0.5" width="49" height="49" rx="5"/><path class="cls-2" d="M38.29,34.56a11.63,11.63,0,0,1-2.81,4.11,13,13,0,0,1-4.41,2.67,16.32,16.32,0,0,1-5.73,1,16.24,16.24,0,0,1-5.75-1,12.42,12.42,0,0,1-4.34-2.67,11.59,11.59,0,0,1-2.74-4.11,14.25,14.25,0,0,1-1-5.33V9.09h7.76v19.5a9.35,9.35,0,0,0,.34,2.52,6.47,6.47,0,0,0,1.05,2.12,5,5,0,0,0,1.88,1.49,6.61,6.61,0,0,0,2.81.54,6.68,6.68,0,0,0,2.81-.54,5.18,5.18,0,0,0,1.89-1.49,5.78,5.78,0,0,0,1.05-2.12,9.77,9.77,0,0,0,.32-2.52V9.09h7.81V29.23A13.86,13.86,0,0,1,38.29,34.56Z" transform="translate(0)"></svg>`;
  }
}
customElements.define('logo-unpkg', LogoUnpkg);
