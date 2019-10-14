import { css } from 'lit-element';

export default css`
  :host {
    --owc-blue: #217ff9;
    --owc-purple: #aa00ff;
    text-align: left;
    font-size: 15px;
    padding: 15px;
    background-color: white;
    min-height: 85px;
    box-sizing: border-box;
    margin: 15px 10px;
    border: 1px solid #ccc;
    display: block;
  }

  #overview,
  .info-grid {
    display: grid;
    grid-gap: 5px;
    grid-template-areas:
      'info info'
      'lastRelease githubStars'
      'downloadTime sizeGzip';
    align-items: center;
  }

  h1 {
    color: var(--owc-blue);
    margin-top: 0;
    margin-bottom: 10px;
    margin-right: 30px;
    font-family: 'Roboto';
    font-size: 22px;
  }

  h1 a {
    color: var(--owc-blue);
    text-decoration: none;
  }

  h1 a:hover {
    text-decoration: underline;
  }

  .big {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .big--not-so-much {
    font-size: 20px;
  }

  .small {
    font-size: 13px;
  }

  .unit {
    color: #777;
    fill: #777;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    margin: 0;
    text-align: center;
  }

  iframe {
    width: 100%;
    border: none;
    height: calc(100vh - 132px);
  }

  #badges {
    margin-top: 10px;
  }

  .desktop {
    display: none;
  }

  #details {
    display: none;
  }

  :host([show-details]) #details {
    display: block;
  }

  :host([show-details]) {
    position: fixed;
    top: 0;
    z-index: 100;
    margin: 0;
    padding: 10px;
    min-height: 100vh;
    min-width: 100vw;
  }

  :host([show-details]) h1 {
    margin-bottom: 10px;
  }

  :host([show-details]) #overview {
    display: none;
  }

  /* Grid */

  #info {
    grid-area: info;
  }

  #lastRelease {
    grid-area: lastRelease;
    min-width: 100px;
  }

  #downloadTime {
    grid-area: downloadTime;
  }

  #sizeGzip {
    grid-area: sizeGzip;
  }

  #githubStars {
    grid-area: githubStars;
  }

  #details {
    grid-area: details;
  }

  #links {
    display: grid;
    grid-template-columns: 130px 130px;
    grid-gap: 28px;
  }

  .link {
    border: 1px solid #ccc;
    width: 130px;
    height: 130px;
  }

  .link a {
    display: flex;
    flex-flow: column;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .link__logo {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }

  :host {
    grid-gap: 5px;
    grid-template-areas:
      'info info'
      'lastRelease githubStars'
      'downloadTime sizeGzip';
  }

  .fake-url-bar {
    border: 7px solid #929292;
    display: block;
    padding: 5px;
  }

  @media only screen and (min-width: 768px) {
    h1 {
      font-size: 26px;
    }

    #links {
      grid-template-columns: 130px 130px 130px 130px;
    }

    :host {
      border-radius: 10px;
      border: none;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    :host #overview {
      grid-gap: 20px;
      grid-template-areas: 'info lastRelease downloadTime sizeGzip githubStars';
    }

    :host([show-details]) #overview {
      display: grid;
    }

    #details {
      margin-top: 15px;
    }

    :host([show-details]) {
      position: static;
      min-height: auto;
      min-width: auto;
      padding: 15px;
      margin: 15px 10px;
    }

    :host([show-details]) h1 {
      margin-bottom: 10px;
    }

    .mobile {
      display: none;
    }

    .desktop {
      display: block;
    }
  }
`;