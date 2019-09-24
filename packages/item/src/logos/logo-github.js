import { LitElement, html, css } from 'lit-element';

class LogoGithub extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  // eslint-disable-next-line
  render() {
    return html`<svg id="Layer_3" data-name="github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.19 47"><defs><style>.cls-1{fill:#221e1b;fill-rule:evenodd;}</style></defs><title>github</title><path class="cls-1" d="M25,1.83a24.09,24.09,0,0,0-7.61,47C18.59,49,19,48.26,19,47.62s0-2.08,0-4.09c-6.7,1.45-8.11-3.23-8.11-3.23-1.1-2.79-2.68-3.53-2.68-3.53-2.19-1.49.17-1.46.17-1.46a5.08,5.08,0,0,1,3.69,2.48c2.15,3.68,5.64,2.62,7,2a5.13,5.13,0,0,1,1.53-3.22c-5.35-.61-11-2.67-11-11.91A9.3,9.3,0,0,1,12.1,18.2a8.73,8.73,0,0,1,.24-6.38s2-.65,6.63,2.47a22.85,22.85,0,0,1,12.06,0c4.6-3.12,6.62-2.47,6.62-2.47a8.68,8.68,0,0,1,.24,6.38,9.29,9.29,0,0,1,2.47,6.46c0,9.26-5.63,11.3-11,11.89A5.75,5.75,0,0,1,31,41c0,3.22,0,5.82,0,6.61s.43,1.4,1.66,1.16A24.1,24.1,0,0,0,25,1.83Z" transform="translate(-0.9 -1.83)"></svg>`;
  }
}
customElements.define('logo-github', LogoGithub);
