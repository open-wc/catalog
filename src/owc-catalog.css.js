import { css } from 'lit-element';

export default css`
  :host {
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
  }

  .app-header svg {
    width: 50px;
    animation: app-logo-spin infinite 20s linear;
  }

  a {
    color: #217ff9;
  }

  .app-footer {
    color: #a8a8a8;
    font-size: calc(10px + 0.5vmin);
  }

  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .package {
    background: #fff;
    box-shadow: 3px 3px 3px 1px #ccc;
    margin: 10px;
    padding: 10px;
  }

  .package__title {
    display: flex;
  }

  .package__footer {
    display: flex;
  }

  .title__name {
    margin-right: 10px;
    text-decoration: none;
  }

  .package__links {
    opacity: 0;
  }

  .package:hover .package__links {
    opacity: 1;
  }

  .link--type {
    width: 17px;
    display: inline-block;
  }

  .link--tag {
    background: #ddd;
    font-size: 14px;
    padding: 3px 5px;
    display: inline-block;
    border-radius: 5px;
    text-decoration: none;
    color: #777;
  }
`;
