export class ConfirmCodePage {

  init(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = ConfirmCodePage.markup();
    const codeInput = this.container.querySelector('.code-input');
    console.log('code render');
    codeInput.addEventListener('input', (e) => {
      const code = e.target.value;
      if (code.length == 5) {
        e.target.blur();
        client
					.checkAuthenticationCode(code)
					.then((result) => {
            console.log('receive result', result);
            codeInput.parentElement.classList.remove('error');
            codeInput.parentElement.querySelector('.placeholder').textContent = 'Code';
						return result;
					})
					.catch((error) => {
            console.error('catch error', error);
            codeInput.parentElement.classList.add('error');
            codeInput.parentElement.querySelector('.placeholder').textContent = 'Invalid Code';
						throw error;
					});
      }
    })
  }

  static markup() {
    return `
      <section class="code-section">
        <div class="code-container">
          <img class="code-monkey" src="./assets/img/Login_6_Code@2x_Monkey.png" alt="Telegram">
          <h2 class="code-telephone">
            <span class="number">${(client ? client.inputPhone : "+9 999 999 99 99")}</span>
            <img class="icon" src="./assets/img/edit_svg.svg" alt="">
          </h2>
          <p class="login-text">We have sent you an SMS <br> with the code</p>
          <div class="tl-input code-input empty">
            <input type="number">
            <label class="placeholder">Code</label>
          </div>
        </div>
      </section>
    `;
  }

  constructor(container) {
    this.init(container);
  }
}