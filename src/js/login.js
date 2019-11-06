import { getCountriesList } from './country-list.js';

const countryUl = document.querySelector('.login-select__country-select ul');
const countryList = getCountriesList();
const loginInput = document.querySelectorAll('.login-input input[type="tel"]');
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

const loginSelectInput = document.querySelector('.login-select input');
const loginSelect = document.querySelector('.login-select .login-select__country-select');
loginSelectInput.onfocus = () => {
	loginSelect.classList.add('show');
};
loginSelectInput.onblur = () => {
	loginSelect.classList.remove('show');
};
const countryLi = countryUl.querySelectorAll('li');
countryLi.forEach((li) => {
	li.onmouseover = (e) => {
		const name = e.target.querySelector('.name');
		loginSelectInput.setAttribute('placeholder', name.textContent);
	};
	li.onmouseout = (e) => {
		loginSelectInput.setAttribute('placeholder', 'Country');
	};
	li.onclick = (e) => {
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

let telIndex = '+1';

function setCursorPosition(pos, elem) {
	elem.focus();
	if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
	else if (elem.createTextRange) {
		var range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function mask(event) {
	var matrix = `${telIndex} (___) ___ ____`,
		i = 0,
		def = matrix.replace(/\D/g, ''),
		val = this.value.replace(/\D/g, '');
	if (def.length >= val.length) val = def;
	this.value = matrix.replace(/./g, function(a) {
		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
	});
	if (event.type == 'blur') {
	} else setCursorPosition(this.value.length, this);
}

loginInput.forEach((input) => {
	input.value = telIndex;
	input.addEventListener('input', mask, false);
	input.addEventListener('focus', mask, false);
	input.addEventListener('blur', mask, false);
});
