import { LitElement, html, css } from 'lit-element';

import openWcLogo from './open-wc-logo.svg.js';

class OwcCatHeader extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          padding: 10px;
          background: linear-gradient(to bottom, #8e9eab, #eef2f3);
        }

        h1 {
          display: none;
        }

        #content {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          max-width: 700px;
        }

        .app-header__logo {
          margin-right: 10px;
        }

        svg {
          width: 50px;
          animation: app-logo-spin infinite 20s linear;
        }

        .input-wrapper {
          display: flex;
          width: 100%;
        }

        input {
          outline: none;
          border: none;
        }

        input {
          width: 100%;
          height: 20px;
          padding: 16px 24px;
          border-radius: 28px;
          font-size: 16px;
          /* TODO: transition box-shadow is slow, use pseudo elements with opacity instead */
          transition: box-shadow 300ms;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
            0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        input::placeholder {
          color: #9e9e9e;
          font-size: 16px;
        }

        input:focus {
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
            0 3px 5px -1px rgba(0, 0, 0, 0.4);
        }

        button[type='submit'] {
          margin-right: 10px;
          height: 34px;
          margin-top: 8px;
        }

        @media only screen and (min-width: 640px) {
          :host {
            padding: 20px;
          }

          h1 {
            display: block;
            margin-top: 0;
            text-align: center;
            color: #fff;
            text-shadow: #333 3px 3px 2px;
          }

          .app-header__logo {
            margin-right: 20px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <h1>Web Component Catalog</h1>
      <form @submit=${this._onSubmit}>
        <div id="content">
          <div class="app-header__logo">
            ${openWcLogo}
          </div>
          <div class="input-wrapper">
            <input id="searchInput" placeholder="Search" autofocus autocomplete="off" />
          </div>
        </div>
      </form>
    `;
  }

  get searchValue() {
    return this.shadowRoot.getElementById('searchInput').value;
  }

  set searchValue(value) {
    this.shadowRoot.getElementById('searchInput').value = value;
  }

  _onSubmit(ev) {
    ev.preventDefault();
    this.dispatchEvent(new Event('search', { bubbles: true }));
  }
}

customElements.define('owc-cat-header', OwcCatHeader);
