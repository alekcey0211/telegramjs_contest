export class ConfirmCodePage {
  // set title(title) {
  //   this.titleValue = title;
  //   this.render();
  // }

  // get title() {
  //   return this.titleValue;
  // }

  init(container) {
    this.container = container;
    // this.titleValue = this.container.dataset.title;
    // this.title = "логин";
    this.render();
  }

  render() {
    this.container.innerHTML = ConfirmCodePage.markup();
    // this.pageElement = this.container.querySelector('.sub-component-example');
    // this.clickMeButton = this.container.querySelector('.click-me');
    // new TlButton(this.pageElement);
    // this.container.addEventListener('click-me-was-clicked', () => console.log('clicked'))

    // this.addEventListeners();
  }

  static markup() {
    return `
      <section class="code-section">
        <div class="code-container">
          <img class="code-monkey" src="./assets/img/Login_6_Code@2x_Monkey.png" alt="Telegram">
          <h2 class="code-telephone">
            <span class="number">+7 926 073 71 71</span>
            <img class="icon" src="./assets/img/edit_svg.svg" alt="">
          </h2>
          <p class="login-text">We have sent you an SMS <br> with the code</p>
          <div class="tl-input empty">
            <input type="number">
            <label class="placeholder">Code</label>
          </div>
        </div>
      </section>
    `;
  }

  // addEventListeners() {
  //   this.clickMeButton.addEventListener('click', () =>
  //     this.container.dispatchEvent(new CustomEvent('click-me-was-clicked')));
  // }

  constructor(container) {
    this.init(container);

    // if (typeof container.dataset.ref === 'undefined') {
    //   this.ref = Math.random();
    //   ConfirmCodePage.refs[this.ref] = this;
    //   container.dataset.ref = this.ref;
    //   this.init(container);
    // } else {
    //   return ConfirmCodePage.refs[container.dataset.ref];
    // }
  }
}

// ConfirmCodePage.refs = {};

// document.addEventListener('DOMContentLoaded', () => {
//   new ConfirmCodePage(document.getElementById('confirm-code-page'))
// });