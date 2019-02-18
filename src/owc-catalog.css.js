import { css } from 'lit-element';

export default css`
  :host {
    /*
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    text-align: center;
    font-size: calc(10px + 2vmin); */
    color: #1a2b42;
  }

  a {
    color: #217ff9;
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

  .package {
    padding: 15px 0;
    max-width: 795px;
    border-bottom: 1px solid #eee;
    margin-left: 90px;
  }

  .package__title {
    display: flex;
    margin-bottom: 15px;
  }

  .package__footer {
    display: flex;
    margin-top: 15px;
  }

  .title__name {
    margin-right: 10px;
    text-decoration: none;
    color: #333;
    font-size: 40px;
    font-weight: bold;
  }

  .package__content {
    display: flex;
  }

  .package__content__text {
    flex-grow: 1;
  }

  .package__content__playground {
    margin-right: 10px;
  }

  .package__links {
    /* opacity: 0; */
  }

  .package:hover .package__links {
    opacity: 1;
  }

  .link--type {
    padding-top: 15px;
    margin-left: 10px;
    opacity: 0.4;
  }

  .link--type:hover {
    opacity: 1;
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
