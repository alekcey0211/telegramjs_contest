export function getOSName() {
	let OSName = 'Unknown';
	if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) OSName = 'Windows 10';
	if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) OSName = 'Windows 8';
	if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) OSName = 'Windows 7';
	if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) OSName = 'Windows Vista';
	if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) OSName = 'Windows XP';
	if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) OSName = 'Windows 2000';
	if (window.navigator.userAgent.indexOf('Mac') !== -1) OSName = 'Mac/iOS';
	if (window.navigator.userAgent.indexOf('X11') !== -1) OSName = 'UNIX';
	if (window.navigator.userAgent.indexOf('Linux') !== -1) OSName = 'Linux';
	if (/iPad|iPhone|iPod/.test(navigator.userAgent)) OSName = 'iOS';

	return OSName;
}

export function getBrowser() {
	let browser_name = '';
	let isIE = /*@cc_on!@*/ false || !!document.documentMode;
	let isEdge = !isIE && !!window.StyleMedia;
	if (navigator.userAgent.indexOf('Chrome') !== -1 && !isEdge) {
		browser_name = 'Chrome';
	} else if (navigator.userAgent.indexOf('Safari') !== -1 && !isEdge && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
		browser_name = 'Safari';
	} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
		browser_name = 'Firefox';
	} else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
		browser_name = 'IE';
	} else if (isEdge) {
		browser_name = 'Edge';
	} else {
		browser_name = 'Unknown';
	}

	return browser_name;
}

/**
 * Функция для проверки правильности ввода номера телефона
 * @param {*} phoneNumber номер телефона
 */
export function isValidPhoneNumber(phoneNumber) {
	if (!phoneNumber) return false;

	let isBad = !phoneNumber.match(/^[\d\-+\s]+$/);
	if (!isBad) {
		phoneNumber = phoneNumber.replace(/\D/g, '');
		if (phoneNumber.length < 7) {
			isBad = true;
		}
	}

	return !isBad;
}

export function setCursorPosition(pos, elem) {
	elem.focus();
	if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
	else if (elem.createTextRange) {
		let range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

export function mask(event) {
	const telCode = event.target.getAttribute('tel-code');
	let matrix = `${telCode} ____________________`,
		i = 0,
		def = matrix.replace(/\D/g, ''),
		val = event.target.value.replace(/\D/g, '');
	if (def.length >= val.length) val = def;
	event.target.value = matrix.replace(/./g, function(a) {
		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
	});
	if (event.type == 'blur') {
	} else setCursorPosition(event.target.value.length, event.target);
}

export function parseTelephoneNumber(number) {
	return number.replace(/\s/g, '').replace(/\(/g,'').replace(/\)/g,'')
}
