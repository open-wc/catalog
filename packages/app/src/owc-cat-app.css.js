import { css } from 'lit-element';

export default css`
  :host {
    color: #1a2b42;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    background: #eee;
  }

  a {
    color: #217ff9;
  }

  #content {
    display: flex;
    flex-grow: 1;
    flex-flow: column;
    margin: 0 auto;
    padding-top: 10px;
  }

  main {
    position: relative;
    flex-grow: 1;
    width: 100vw;
  }

  owc-cat-filters {
    z-index: 100;
  }

  .app-footer {
    color: #a8a8a8;
    font-size: calc(10px + 1vmin);
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }

  /* mobile details swipe/scroll */
  :host([show-mobile-detail]) .items-wrapper {
    margin-top: 15px;
  }

  .pill {
    white-space: nowrap;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 12px;
    text-transform: none;
    margin: 10px 5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    background: #ccc;
    color: #000;
    border: 1px solid #aaa;
  }

  [owc-tabs-active].pill {
    background: #666;
    color: #fff;
  }

  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  #loading {
    display: none;
  }

  :host([loading]) #loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(200, 200, 200, 0.5);
    --semipolar-spinner__color: #999;
  }

  @media only screen and (min-width: 420px) {
    :host {
      background: #f7f7f7;
    }

    #content {
      flex-flow: row;
      padding: 20px;

      max-width: 1080px;
    }
  }
`;
