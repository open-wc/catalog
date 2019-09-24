import { LitElement, html, css } from 'lit-element';

class OwcCatFilters extends LitElement {
  static get styles() {
    return [
      css`
        label {
          display: block;
        }

        h3 {
          margin: 0;
          text-align: center;
          margin-bottom: 10px;
        }

        #content {
          display: none;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          padding: 10px;
          text-align: center;
        }

        #content h3 button {
          float: right;
        }

        :host([opened]) #content {
          display: block;
        }

        @media only screen and (min-width: 420px) {
          :host {
            margin-right: 20px;
          }

          h1 {
            font-size: 30px;
          }

          h3 {
            text-align: left;
            margin-bottom: 0;
          }

          .mobile {
            display: none;
          }

          #content {
            display: block;
            box-sizing: border-box;
            position: static;
            width: auto;
            height: auto;
            padding: 0;
            text-align: left;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      opened: { type: Boolean, reflect: true },
    };
  }

  toggle() {
    this.opened = !this.opened;
  }

  constructor() {
    super();
    this.addEventListener('submit', ev => {
      ev.preventDefault();
    });
  }

  firstUpdated() {
    super.firstUpdated();
    this.shadowRoot.addEventListener('change', () => {
      this._onSubmit();
    });
  }

  render() {
    return html`
      <form id="form">
        <h3 @click=${this.toggle}>Filters</h3>
        <div id="content">
          <h3 @click=${this.toggle} class="mobile">
            Filters <button @click=${ev => ev.preventDefault()}>x</button>
          </h3>
          <h4>Dependencies</h4>
          <div id="dependencies" @change=${this.search}>
            <label>
              <input type="checkbox" name="dependencies" value="lit-element@2.x.x" /> LitElement 2.x
            </label>
            <label>
              <input type="checkbox" name="dependencies" value="haunted@4.x.x" /> Haunted 4.x
            </label>
            <label>
              <input type="checkbox" name="dependencies" value="@stencil/core@1.x.x" /> Stencil 1.x
            </label>
            <div
              style="font-style: italic; text-align: center; font-size: 10px; line-height: 10px; margin-top: 5px;"
            >
              all below is not <br />
              yet implemented 🙈
            </div>

            <label> <input type="checkbox" /> Custom </label>
          </div>
          <h4>Last Release</h4>
          <div id="release">
            <label> <input type="radio" name="release" value="6" /> &lt; 6 months </label>
            <label> <input type="radio" name="release" value="3" /> &lt; 3 months </label>
            <label> <input type="radio" name="release" value="custom" /> Custom </label>
          </div>
          <h4>Size</h4>
          <div id="size">
            <label> Download Time <br /><input type="range" name="downloadTime" /> </label>
            <label>
              Size (Gzip) <br />
              <input type="range" name="sizeGzip" />
            </label>
            <label>
              Size (self) <br />
              <input type="range" name="sizeSelf" />
            </label>
          </div>
          <h4>Properties</h4>
          <div id="module">
            <label> <input type="checkbox" name="esModule" /> has es module</label>
            <label> <input type="checkbox" name="esModule" /> has demo</label>
          </div>

          <h4>Github</h4>
          <div id="size">
            <label> Stars <br /><input type="range" name="githubStars" /> </label>
            <label> Watchers <br /><input type="range" name="githubWatchers" /> </label>
          </div>
        </div>
      </form>
    `;
  }

  get formEl() {
    return this.shadowRoot.getElementById('form');
  }

  _onSubmit(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.dispatchEvent(new Event('search', { bubbles: true }));
  }
}

customElements.define('owc-cat-filters', OwcCatFilters);
