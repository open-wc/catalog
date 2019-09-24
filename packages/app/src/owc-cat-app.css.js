import { css } from 'lit-element';

export default css`
  :host {
    color: #1a2b42;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
  }

  a {
    color: #217ff9;
  }

  #content {
    display: flex;
    flex-grow: 1;
    flex-flow: column;
    margin: 10px auto 0 auto;
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
    #content {
      flex-flow: row;
      padding: 0 20px;

      max-width: 1080px;
      margin-top: 20px;
    }
  }
`;
