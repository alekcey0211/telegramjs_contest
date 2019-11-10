import { getCountriesList } from './country-list.js';
import { setCursorPosition, mask, isValidPhoneNumber, parseTelephoneNumber } from './utils';
import { Client } from './client';
import { options } from './api-tlg';
import { LoginPage } from './login-page'

// let telCode = '+1';

// const client = new Client(options);
// client.setTdlibParameters();
// client.checkDatabaseEncryptionKey();

const mainPage = document.querySelector('main');
mainPage.innerHTML = new LoginPage().render();

/**
 * telegram input
 */
const loginInputContainer = document.querySelector('.login-input');
const loginInput = loginInputContainer.querySelector('input[type="tel"]');
loginInput.setAttribute('tel-code', '+1');

const tlInputs = document.querySelectorAll('.tl-input input');
tlInputs.forEach((input) => {
	input.addEventListener('input',(e) => onInput(e),false);
	input.addEventListener('focus', (e) => onInput(e), false);
	input.addEventListener('blur', (e) => onInput(e), false);
})
function onInput(e) {
	if (e.target.type == 'tel') {
		mask(e);
	}
	if (e.type == 'focus') {
		e.target.parentElement.classList.add('focused');
	}
	if (e.type == 'blur') {
		e.target.parentElement.classList.remove('focused');
	}
	if (e.target.value != '') {
		e.target.parentElement.classList.remove('empty');
	} else {
		e.target.parentElement.classList.add('empty');
	}
}
/**
 *
 */

/**
 * telegram select
 */
const loginSelect = document.querySelector('.tl-select');
const loginSelectInner = loginSelect.querySelector('.inner');
const loginSelectInnerInput = loginSelectInner.querySelector('input');
const loginSelectInnerPlaceholder = loginSelectInner.querySelector('.placeholder');
const loginSelectOption = loginSelect.querySelector('.option');
const loginSelectOptionList = loginSelectOption.querySelector('ul');
initCountryList(loginSelectOptionList);
const loginSelectOptionListItem = loginSelectOptionList.querySelectorAll('.item');

loginSelectInnerInput.onfocus = () => {
	loginSelect.classList.toggle('show');
};

loginSelectInnerInput.onblur = () => {
	loginSelect.classList.toggle('show');
};

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
/**
 *
 */

/**
 * формирование списка стран для списка ul
 */
function initCountryList(selectList) {
	const countryList = getCountriesList();
	countryList.forEach((country) => {
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

/**
 * telegram button
 */

const loginButtonContainer = document.querySelector('.login-button');
const loginButton = loginButtonContainer.querySelector('button');
loginButton.onclick = (e) => {
	const phoneNumber = parseTelephoneNumber(loginInput.value);
	console.log(phoneNumber);
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

/**
 *
 */
