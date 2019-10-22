import { LitElement, html, css } from 'lit-element';

const debounce = (func, delay) => {
  let inDebounce;
  return function(...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export class OwcTabs extends LitElement {
  static get properties() {
    return {
      activeIndex: { type: Number },
      mode: { type: String, reflect: true },
    };
  }

  get tabs() {
    return [...this.querySelectorAll('[slot=tab]')];
  }

  get contents() {
    return [...this.querySelectorAll('[slot=tab-content]')];
  }

  constructor() {
    super();
    this.activeIndex = 0;
    this.mode = 'scroll'; // [scroll, display]

    this.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(ev) {
    const path = ev.composedPath();
    const foundIndex = this.tabs.indexOf(path[0]);
    if (foundIndex !== -1) {
      this.activeIndex = foundIndex;
      this.dispatchEvent(new Event('activeIndexChanged'));
    }
  }

  __setAttributesForEls(activeIndex) {
    this.tabs.forEach((el, i) => {
      if (i === activeIndex) {
        el.setAttribute('owc-tabs-active', '');
      } else {
        el.removeAttribute('owc-tabs-active');
      }
    });
    this.contents.forEach((el, i) => {
      if (i === activeIndex) {
        el.setAttribute('owc-tabs-active', '');
      } else {
        el.removeAttribute('owc-tabs-active');
      }
    });
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('activeIndex')) {
      this.__setAttributesForEls(this.activeIndex);
      if (this.mode === 'scroll') {
        // this.contents[this.activeIndex].scrollIntoView({
        //   behavior: 'smooth',
        // });

        this.wrapper.scrollLeft = this.contents[this.activeIndex].offsetLeft;
        this.tabsWrapper.scrollLeft = this.tabs[this.activeIndex].offsetLeft;
      }
    }
  }

  get tabsWrapper() {
    return this.shadowRoot.getElementById('tabs-wrapper');
  }

  get wrapper() {
    return this.shadowRoot.getElementById('wrapper');
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    super.firstUpdated();
    this.wrapper.addEventListener(
      'scroll',
      debounce(() => {
        this.contents.forEach((el, i) => {
          if (this.wrapper.scrollLeft === el.offsetLeft) {
            this.activeIndex = i;
          }
        });
      }, 100),
    );
  }

  _updateSlotCount() {
    const visibleTabs = this.tabs.filter(tab => getComputedStyle(tab).display !== 'none');
    this.style.setProperty('--owc-tabs-count', visibleTabs.length);
  }

  render() {
    return html`
      <div id="tabs-wrapper">
        <div id="tabs">
          <slot name="tab"></slot>
        </div>
      </div>
      <div id="wrapper">
        <div id="contents">
          <slot name="tab-content" @slotchange=${this._updateSlotCount}></slot>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;

        --owc-tabs-count: 2;
      }

      ::-webkit-scrollbar {
        height: 0;
        width: 0;
        background: transparent;
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
        /* margin-top: 10px; */
      }

      /* mode = scroll */
      :host([mode='scroll']) #tabs-wrapper {
        overflow-x: scroll;
        scroll-behavior: smooth;
      }

      :host([mode='scroll']) #tabs {
        border: none;
      }

      /* :host([mode='scroll']) #tabs::before,
      :host([mode='scroll']) #tabs::after {
        content: '';
        display: block;
        padding: 5px;
      } */

      :host([mode='scroll']) #wrapper {
        scroll-snap-type: x mandatory;
        overflow-x: scroll;
        scroll-behavior: smooth;
      }

      :host([mode='scroll']) #contents {
        display: flex;
        /* flex-flow: column; */
        width: calc(100% * var(--owc-tabs-count));
      }

      :host([mode='scroll']) #contents ::slotted(*) {
        scroll-snap-align: start;
        display: block;
        /* width: 100%; */
      }
    `;
  }
}

customElements.define('owc-tabs', OwcTabs);
