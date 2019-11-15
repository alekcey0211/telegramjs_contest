export class PasswordPage {
	init(container) {
		this.container = container;
		this.render();
	}

	render() {
		this.container.innerHTML = this.markup();
		const passwordInput = this.container.querySelector('.password-input input');
		const passwordInputRightIcon = this.container.querySelector('.password-input input .right-icon');
		const passwordButton = this.container.querySelector('.password-button a');
		const passwordImg = this.container.querySelector('.password-monkey');

		passwordInput.addEventListener('keyup', (e) => {
			if (e.code == 'Enter') {
				passwordButton.click();
			}
		})

		passwordInputRightIcon.addEventListener('click', (e) => {

			//Изменяю картинку
			if (passwordInputRightIcon.src.indexOf('eye1') < 0) {
				passwordInputRightIcon.src = './assets/img/eye1_svg.svg';
			} else {
				passwordInputRightIcon.src = './assets/img/eye2_svg.svg';
			}

			//Меняю тип поля ввода, чтобы пароль стал видимым
			if (passwordInput.type === 'text') {
				passwordInput.type = 'password';
			} else {
				passwordInput.type = 'text';
			}
		})

		passwordButton.addEventListener('click', (e) => {
			const password = passwordInput.value;
			client
				.checkAuthenticationPassword(password)
				.then((result) => {
					console.log('receive result', result);
					passwordInput.parentElement.classList.remove('error');
					passwordInput.parentElement.classList.add('correct');
					passwordInput.parentElement.querySelector('.placeholder').textContent = 'Password is correct';
					window.location.hash = '#main-page';
					return result;
				})
				.catch((error) => {
					console.error('catch error', error);
					passwordImg.src = './assets/img/Login_10_Password_Invalid@2x_Monkey.png';
					passwordInput.parentElement.classList.add('error');
					passwordInput.parentElement.classList.remove('correct');
					passwordInput.parentElement.querySelector('.placeholder').textContent = 'Invalid Password';
					throw error;
				});
		});
	}

	markup() {
		return `
      <section class="password-section">
        <div class="password-container">
          <img class="password-monkey" src="./assets/img/Login_8_Password@2x_Monkey.png" alt="Telegram">
          <h2 class="password-title">
            Enter a Password
          </h2>
          <p class="login-text">Your account is protected with <br> an additional password.</p>
          <div class="tl-input password-input empty">
            <input type="password">
						<label class="placeholder">Password</label>
						<img class="right-icon" src="./assets/img/eye1_svg.svg">
          </div>
          <div class="password-button">
            <button class="tl-button tl-full-button">Next</button>
          </div>
        </div>
      </section>
    `;
	}

	constructor(container) {
		this.init(container);
	}
}
