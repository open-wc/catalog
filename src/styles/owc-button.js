import { css } from 'lit-element';

export default css`
  /* reset */
  .owc-button {
    font: inherit;
    font-size: 16px;
    margin: 0;
    border: 0;
    padding: 0;
    color: inherit;
    background-color: transparent;
    text-align: left;
    white-space: normal;
    overflow: visible;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .owc-button {
    border-radius: 4px;
    padding: 8px;
    border: 1px solid #0077ff;
    display: block;
    text-decoration: none;
    cursor: pointer;
  }

  .owc-button-filled {
    background-color: #0077ff;
    color: white;
  }
`;
