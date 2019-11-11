import { mask } from '../utils';

window.addEventListener('hashchange', initForm);

window.addEventListener('DOMContentLoaded', initForm);

window.addEventListener('onRender', initForm);

function initForm() {
	console.log('hashchange init form');
	const tlInputs = document.querySelectorAll('.tl-input input');
	tlInputs.forEach((input) => {
		input.addEventListener('input', (e) => onInput(e), false);
		input.addEventListener('focus', (e) => onInput(e), false);
		input.addEventListener('blur', (e) => onInput(e), false);
		if (input.value) {
			input.focus();
			input.blur();
		}
	});
	function onInput(e) {
		if (e.target.type == 'tel' && e.target.getAttribute('tel-code')) {
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

	const loginSelect = document.querySelector('.tl-select');
	if (loginSelect) {
		const loginSelectInner = loginSelect.querySelector('.inner');
		const loginSelectInnerInput = loginSelectInner.querySelector('input');
		const loginSelectOption = loginSelect.querySelector('.option');
		const loginSelectOptionList = loginSelectOption.querySelector('ul');
		loginSelectInnerInput.onfocus = () => {
			loginSelect.classList.toggle('show');
		};

		loginSelectInnerInput.onblur = () => {
			loginSelect.classList.toggle('show');
		};
	}
}
