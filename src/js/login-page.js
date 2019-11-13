import { getCountriesList } from './country-list.js';
import { isValidPhoneNumber, parseTelephoneNumber } from './utils';

export class LoginPage {
	init(container) {
		this.container = container;
		this.showButton = false;
		this.phoneNumber = "";
		this.render();
	}

	/**
	 * Функция для изменения значения видимости кнопки NEXT
	 * Не работает как надо, из-за того что происходит render() и пропадает фокус с поля ввода
	 * @param {*} visible видимость кнопки
	 */
	setVisibleButton(visible) {
		this.showButton = visible;
		this.render();
	}

	render() {
		this.container.innerHTML = LoginPage.markup(this);
		window.dispatchEvent(new CustomEvent('onRender'));

		// input
		const loginInputContainer = this.container.querySelector('.login-input');
    const loginInput = loginInputContainer.querySelector('input[type="tel"]');
		if (loginInputContainer) {
			loginInput.setAttribute('tel-code', '+1');
			loginInput.addEventListener('input', (e) => {
				this.phoneNumber = e.target.value;
			})
		}

		// button
		const loginButtonContainer = document.querySelector('.login-button');
		if (loginButtonContainer) {
			const loginButton = loginButtonContainer.querySelector('.tl-button');
			loginButton.onclick = (e) => {
				client.inputPhone = loginInput.value;
				const phoneNumber = parseTelephoneNumber(loginInput.value);
				client
					.setAuthenticationPhoneNumber(phoneNumber)
					.then((result) => {
						console.log('receive result', result);
						return result;
					})
					.catch((error) => {
						console.error('catch error', error);
						throw error;
					});
			};
		}

		// костыль
		loginInput.addEventListener('input', (e) => {
			const number = parseTelephoneNumber(e.target.value);
			if (isValidPhoneNumber(number)) {
				loginButtonContainer.classList.remove('hide')
			} else {
				loginButtonContainer.classList.add('hide')
			}
		})

		// select
		const loginSelect = this.container.querySelector('.tl-select');
		if (loginSelect) {
			const loginSelectInner = loginSelect.querySelector('.inner');
			const loginSelectInnerInput = loginSelectInner.querySelector('input');
			const loginSelectInnerPlaceholder = loginSelectInner.querySelector('.placeholder');
			const loginSelectOption = loginSelect.querySelector('.option');
			const loginSelectOptionList = loginSelectOption.querySelector('ul');
			this.initCountryList(loginSelectOptionList, getCountriesList());
			const loginSelectOptionListItem = loginSelectOptionList.querySelectorAll('.item');

			loginSelectOptionListItem.forEach((item) => {
				item.onmouseover = (e) => {
					const name = e.target.querySelector('.name');
					if (loginSelectInnerPlaceholder) {
						loginSelectInnerPlaceholder.textContent = name.textContent;
					}
				};
				item.onmouseout = (e) => {
					if (loginSelectInnerPlaceholder) {
						loginSelectInnerPlaceholder.textContent = 'Country';
					}
				};
				item.onclick = (e) => {
					const name = e.target.querySelector('.name');
					const code = e.target.querySelector('.code');
					if (loginSelectInnerPlaceholder) {
						loginSelectInnerPlaceholder.textContent = 'Country';
					}
					loginSelectInnerInput.value = name.textContent;
					loginSelectInner.classList.remove('empty');
					const telCode = code.textContent;
					loginInput.value = telCode;
					loginInput.setAttribute('tel-code', telCode);
					loginInput.parentElement.classList.remove('empty');
				};
			});
		}
	}

	initCountryList(selectList, list) {
		list.forEach((country) => {
			const li = document.createElement('li');
			const divCode = document.createElement('div');
			const divName = document.createElement('div');
			li.classList.add('item');
			divName.textContent = country.name;
			divName.classList.add('name');
			divCode.textContent = country.code;
			divCode.classList.add('code');
			li.appendChild(divName);
			li.appendChild(divCode);
			selectList.appendChild(li);
		});
	}

	static markup({phoneNumber}) {
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
            <input type="tel" value="${phoneNumber}">
            <label class="placeholder">Phone Number</label>
          </div>
          <label class="tl-checkbox login-checkbox">
            Keep me signed in
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <div class="login-button hide">
            <a href="#confirm-code" class="tl-button tl-full-button">Next</a>
          </div>
        </div>
			</section>
    `;
	}

	constructor(container) {
		this.init(container);
	}
}
