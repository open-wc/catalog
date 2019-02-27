import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { wcTypes } from '../values.js';
import openWcLogo from '../icons/open-wc-logo.js';
import owcButtonStyles from '../styles/owc-button.js';
import owcSelectStyles from '../styles/owc-select.js';

const filterOptions = wcTypes.map(
  type =>
    html`
      <option value=${type.key}>${type.label}</option>
    `,
);

class OwcPackageSearch extends LitElement {
  static get styles() {
    return [
      owcButtonStyles,
      owcSelectStyles,
      css`
        :host {
          display: flex;
          margin: auto;
          width: 60vw;
          padding: 20px 20px 15px 20px;
          border-bottom: 1px solid #ccc;
        }

        h1 {
          display: none;
        }

        .app-header__logo {
          margin-right: 20px;
        }

        svg {
          width: 50px;
          animation: app-logo-spin infinite 20s linear;
        }

        form {
          flex-grow: 1;
          width: 60vw;
          max-width: 800px;
        }

        .input-wrapper {
          display: flex;
        }

        .filter-wrapper {
          margin-top: 20px;
        }

        .filter-wrapper a {
          font-size: 14px;
          color: #555;
          text-decoration: none;
          padding: 0 10px;
        }

        .filter-wrapper a.selected,
        .filter-wrapper a:hover {
          padding-bottom: 13px;
          border-bottom: 3px solid;
          border-bottom-color: #aa00ff;
        }

        input {
          outline: none;
          border: none;
          margin-right: 15px;
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

        button[type='submit'],
        select[name='type'] {
          margin-right: 10px;
          height: 34px;
          margin-top: 8px;
        }
        #filterSelect {
          display: none;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="app-header__logo">
        <h1>Web Component Catalog</h1>
        ${unsafeHTML(openWcLogo)}
      </div>
      <form @submit=${this._onSubmit}>
        <div class="input-wrapper">
          <input id="searchInput" placeholder="Search" autofocus autocomplete="off" />

          <button class="owc-button owc-button-filled" type="submit" @click=${this._search}>
            Search
          </button>
        </div>
        <div class="filter-wrapper">
          ${this.filterDisplay()}
        </div>
        <select id="filterSelect" class="owc-select" name="filter">
          ${filterOptions}
        </select>
      </form>
    `;
  }

  clickFilter(ev, type) {
    this.filterElement.value = type.key;
    this._onSubmit(ev);
    this.requestUpdate();
  }

  filterDisplay() {
    /* eslint-disable lit/no-template-bind */
    // TODO: howto pass properties with this rule?
    return wcTypes.map(
      type =>
        html`
          <a
            href="#"
            class=${this.filterElement && this.filterElement.value === type.key ? 'selected' : ''}
            @click=${ev => this.clickFilter(ev, type)}
            >${type.label}</a
          >
        `,
    );
    /* eslint-enable lit/no-template-bind */
  }

  get searchElement() {
    return this.shadowRoot.getElementById('searchInput');
  }

  get filterElement() {
    return this.shadowRoot.getElementById('filterSelect');
  }

  _onSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('package-search-submit', {
        detail: {
          query: this.searchElement.value,
          filter: this.filterElement.value,
        },
      }),
    );
  }
}

customElements.define('owc-package-search', OwcPackageSearch);
