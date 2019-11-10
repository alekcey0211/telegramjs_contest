import { Component } from './component';

export class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      
    }
  }

  render() {
    return `
      <section class="login-section">
        <div class="login-container">
          <img class="login-logo" src="./assets/img/logo.png" alt="Telegram">
          <h2 class="login-title">Sign in to Telegram</h2>
          <p class="login-text">Please confirm your country and enter your phone number</p>
          <div class="tl-select login-select">
            <div class="inner tl-input empty">
              <input type="text" readonly>
              <label class="placeholder">Country</label>
            </div>
            <div class="option">
              <ul></ul>
            </div>
          </div>
          <div class="tl-input login-input empty">
            <input type="tel">
            <label class="placeholder">Phone Number</label>
          </div>
          <label class="tl-checkbox login-checkbox">
            Keep me signed in
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <div class="login-button">
            <button class="tl-full-button">Next</button>
          </div>
        </div>
      </section>
    `;
  }
}