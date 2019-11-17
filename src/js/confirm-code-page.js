export class ConfirmCodePage {
	init(container) {
		this.container = container;
		this.render();
	}

	render() {
		this.container.innerHTML = this.markup();
		const codeInput = this.container.querySelector('.code-input input');
		const codeImg = this.container.querySelector('.code-monkey');
		codeInput.addEventListener('input', (e) => {
			const code = e.target.value;
			if (code.length == 5) {
				e.target.blur();
				client
					.checkAuthenticationCode(code)
					.then((result) => {
						console.log('receive result', result);
						codeInput.parentElement.classList.remove('error');
						codeInput.parentElement.classList.add('correct');
						codeInput.parentElement.querySelector('.placeholder').textContent = 'Code is correct';
						client
							.getAuthorizationState()
							.then((result) => {
								let clientState = result;
								if (clientState['@type'] === 'authorizationStateReady') {
									window.location.hash = '#main-page';
								} else {
									window.location.hash = '#password';
								}
								return result;
							})
							.catch((error) => {
								console.error('catch error', error);
								throw error;
							});
						window.location.hash = '#password';
						return result;
					})
					.catch((error) => {
						console.error('catch error', error);
						codeImg.src = './assets/img/Login_7_Code_Invalid@2x_Monkey.png';
						codeInput.parentElement.classList.add('error');
						codeInput.parentElement.classList.remove('correct');
						codeInput.parentElement.querySelector('.placeholder').textContent = 'Invalid Code';
						throw error;
					});
			}
		});
	}

	markup() {
		return `
      <section class="code-section">
        <div class="code-container">
          <img class="code-monkey" src="./assets/img/Login_6_Code@2x_Monkey.png" alt="Telegram">
          <h2 class="code-telephone">
            <span class="number">${client ? client.inputPhone : '+9 999 999 99 99'}</span>
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
