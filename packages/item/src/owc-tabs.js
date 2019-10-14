import { LitElement, html, css } from 'lit-element';

export class OwcTabs extends LitElement {
  static get properties() {
    return {
      activeIndex: { type: Number },
    };
  }

  get tabs() {
    return this.shadowRoot.querySelector('slot[name=tab]').assignedElements();
  }

  get contents() {
    return this.shadowRoot.querySelector('slot[name=tab-content]').assignedElements();
  }

  constructor() {
    super();
    this.activeIndex = 0;

    this.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(ev) {
    const foundIndex = this.tabs.indexOf(ev.path[0]);
    if (foundIndex !== -1) {
      this.activeIndex = foundIndex;
      this.dispatchEvent(new Event('activeIndexChanged'));
    }
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('activeIndex')) {
      this.tabs.forEach((el, i) => {
        if (i === this.activeIndex) {
          el.setAttribute('owc-tabs-active', '');
        } else {
          el.removeAttribute('owc-tabs-active');
        }
      });
      this.contents.forEach((el, i) => {
        if (i === this.activeIndex) {
          el.setAttribute('owc-tabs-active', '');
        } else {
          el.removeAttribute('owc-tabs-active');
        }
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    super.firstUpdated();
  }

  render() {
    return html`
      <div id="tabs">
        <slot name="tab"></slot>
      </div>
      <div id="contents">
        <slot name="tab-content"></slot>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
      }

      #tabs {
        display: flex;
        border-bottom: 2px solid #ccc;
      }

      #tabs ::slotted(*) {
        cursor: pointer;
        padding-bottom: 7px;
        margin-bottom: -2px;
        margin-right: 13px;
        text-transform: uppercase;
      }

      #tabs ::slotted([owc-tabs-active]) {
        border-bottom: 4px solid #217ff9;
      }

      #contents ::slotted(*) {
        display: none;
      }

      #contents ::slotted([owc-tabs-active]) {
        display: block;
        margin-top: 10px;
      }
    `;
  }
}

customElements.define('owc-tabs', OwcTabs);
