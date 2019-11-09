import { getCountriesList } from './country-list.js';
import { setCursorPosition, mask, isValidPhoneNumber } from './utils';

const main = async () => {
	let telIndex = '+1';

	const countryUl = document.querySelector('.login-select__country-select ul');
	const loginInput = document.querySelectorAll('.login-input input[type="tel"]');
	initCountryList(countryUl);

	const loginSelectInput = document.querySelector('.login-select input');
	const loginSelect = document.querySelector('.login-select .login-select__country-select');
	const loginSelectItem = loginSelect.querySelectorAll('ul li');

	loginSelectInput.setAttribute("contenteditable","false");

	loginSelectInput.onfocus = () => {
		loginSelect.classList.add('show');
	};

	loginSelectInput.onblur = () => {
		loginSelect.classList.remove('show');
	};

	loginSelectItem.forEach((item) => {
		item.onmouseover = (e) => {
			const name = e.target.querySelector('.name');
			loginSelectInput.setAttribute('placeholder', name.textContent);
		};
		item.onmouseout = (e) => {
			loginSelectInput.setAttribute('placeholder', 'Country');
		};
		item.onclick = (e) => {
			const name = e.target.querySelector('.name');
			const code = e.target.querySelector('.code');
			loginSelectInput.setAttribute('value', name.textContent);
			telIndex = code.textContent;
			loginSelect.classList.remove('show');
			loginInput.forEach((input) => {
				input.value = telIndex;
			});
		};
	});

	loginInput.forEach((input) => {
		input.value = telIndex;
		input.addEventListener('input', mask, false);
		input.addEventListener('focus', mask, false);
		input.addEventListener('blur', mask, false);
	});
};

main();

/**
 * формирование списка стран для списка ul
 * @countryUl - <ul></ul>
 */
function initCountryList(countryUl) {
	const countryList = getCountriesList();
	countryList.forEach((country) => {
		const li = document.createElement('li');
		const divCode = document.createElement('div');
		const divName = document.createElement('div');
		divName.textContent = country.name;
		divName.classList.add('name');
		divCode.textContent = country.code;
		divCode.classList.add('code');
		li.appendChild(divName);
		li.appendChild(divCode);
		countryUl.appendChild(li);
	});
}
