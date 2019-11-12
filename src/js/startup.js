import { Routing } from './routing';

class App {
	constructor() {
		this.routes = new Routing();
		this.startPage = 'init-client';
		this.init();
	}

	routeChange() {
		console.log(typeof client);
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

