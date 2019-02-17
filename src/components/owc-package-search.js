import { LitElement, html, css } from 'lit-element';
import { wcTypes } from '../values.js';
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

        button[type='submit'],
        select[name='type'] {
          margin-top: 16px;
        }
      `,
    ];
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}>
        <input id="searchInput" placeholder="Search" autofocus />

        <button class="owc-button owc-button-filled" type="submit" @click=${this._search}>
          Search
        </button>

        <select id="filterSelect" class="owc-select" name="filter">
          ${filterOptions}
        </select>
      </form>
    `;
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
