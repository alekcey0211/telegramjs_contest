export default class TlButton {
  init(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = TlButton.markup(this);
    this.addEventListeners();
  }

  static markup() {
    return `
      <div class="login-button">
        <button class="tl-full-button">Next</button>
      </div>
    `;
  }

  addEventListeners() {
    // this.clickMeButton().addEventListener('click', () =>
    //   this.container.dispatchEvent(new CustomEvent('click-me-was-clicked')));
  }

  constructor(container) {
    // The constructor should only contain the boiler plate code for finding or creating the reference.
    if (typeof container.dataset.ref === 'undefined') {
      this.ref = Math.random();
      TlButton.refs[this.ref] = this;
      container.dataset.ref = this.ref;
      this.init(container);
    } else {
      // If this element has already been instantiated, use the existing reference.
      return TlButton.refs[container.dataset.ref];
    }
  }
}

TlButton.refs = {};

// document.addEventListener('DOMContentLoaded', () => {
//   new ConfirmCodePage(document.getElementById('confirm-code-page'))
// });