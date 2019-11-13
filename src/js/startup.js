import { Routing } from './routing';

/**
 * Вывод консоли в блок для того, чтобы увидеть консольные сообщения на телефоне 
 */
if (typeof console !== undefined) {
	console.olog = console.log;
	console.log = (message) => {
		const outConsoleBlock = document.querySelector('.out-console-block');
		if (outConsoleBlock) {
			const p = document.createElement('p');
			p.textContent = message;
			outConsoleBlock.appendChild(p);
		}
	}
	console.error = console.debug = console.info = console.warn = console.log;
}

class App {
	constructor() {
		this.routes = new Routing();
		this.startPage = 'init-client';
		this.init();
	}

	routeChange() {
		if (typeof client === 'undefined') {
			window.location.hash = '#init-client';
		}
		this.routeID = location.hash.slice(1);
		this.route = this.routes.route[this.routeID];
		this.routeElem = document.getElementById(this.routeID);
		this.route.rendered(document.querySelector('main'));
	}

	init() {
		window.addEventListener('hashchange', (e) => this.routeChange());
		if (!window.location.hash) {
			window.location.hash = this.default;
		} else {
			this.routeChange();
		}
	}
};

window.app = new App();