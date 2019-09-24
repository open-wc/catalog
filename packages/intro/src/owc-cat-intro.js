import { LitElement, html, css } from 'lit-element';

import owcButtonStyles from './owc-button.css.js';

class OwcCatIntro extends LitElement {
  static get styles() {
    return [
      owcButtonStyles,
      css`
        :host {
          display: flex;
          height: 100vh;
          background: linear-gradient(to bottom, #8e9eab, #eef2f3);
          flex-flow: column;
          justify-content: center;
        }

        h1 {
          font-size: 24px;
          text-align: center;
          color: #fff;
          text-shadow: #333 3px 3px 2px;
        }

        #content {
          width: 90%;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
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
          margin-top: 12px;
          max-width: 120px;
          height: 34px;
          text-align: center;
        }

        @media only screen and (min-width: 420px) {
          h1 {
            font-size: 30px;
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
          <div class="input-wrapper">
            <input
              id="searchInput"
              placeholder="Search (try to search for 'test')"
              autofocus
              autocomplete="off"
            />
          </div>
          <button class="owc-button owc-button-filled" type="submit" @click=${this._search}>
            Search
          </button>
          <p>
            In alpha phase you need to manually index packages via <a href="./add.html">add.html</a>
          </p>
        </div>
      </form>
    `;
  }

  /**
   * The current filled in value of the search input
   *
   * @example getting search value
   * // user writes "button" into the input field
   * expect(el.searchValue).to.equal('button');
   *
   * @returns {string}
   */
  get searchValue() {
    return this.shadowRoot.getElementById('searchInput').value;
  }

  /**
   * @example search value in templates
   * <owc-cat-intro .searchValue=${"button"}></owc-cat-intro>
   * // users sees "button" filled in the search input
   *
   * @example setting search value
   * el.searchValue = 'button';
   * // users sees "button" filled in the search input
   *
   * @param {string} value Value to be set for the input
   */
  set searchValue(value) {
    this.shadowRoot.getElementById('searchInput').value = value;
  }

  _onSubmit(ev) {
    ev.preventDefault();
    /**
     * Fires when the user wishes to search
     *
     * @example
     * <owc-cat-intro @search=${this.yourSearchImplemntation}></owc-cat-intro>
     *
     * @example
     * el.addEventListener('search', this.yourSearchImplemntation.bind(this));
     */
    this.dispatchEvent(new Event('search', { bubbles: true }));
  }
}

customElements.define('owc-cat-intro', OwcCatIntro);
