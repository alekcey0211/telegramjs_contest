// (function() {
import { Routing } from './routing';
import { Client } from './client';

const app = {
	routes: new Routing(),
	default: 'the-default-view',
	routeChange: () => {
		app.routeID = location.hash.slice(1);
		app.route = app.routes.route[app.routeID];
		app.routeElem = document.getElementById(app.routeID);
		app.route.rendered(document.querySelector('main'));
	},
	init: function() {
		window.addEventListener('hashchange', function() {
			app.routeChange();
		});
		if (!window.location.hash) {
			window.location.hash = app.default;
		} else {
			app.routeChange();
		}
	}
};
window.app = app;
// })();

app.init();

const client = new Client();
client.setTdlibParameters();
client.checkDatabaseEncryptionKey();
window.client = client;
