import { ConfirmCodePage } from './confirm-code-page'
import { LoginPage } from './login-page';

export class Routing {
	constructor() {
		this.route = {
			login: {
				rendered: (container) => {
					const loginPage = new LoginPage(container);
					this.preventScroll();
				}
			},
			'confirm-code': {
				rendered: (container) => {
					new ConfirmCodePage(container);
					this.preventScroll();
				}
			},
			'the-default-view': {
				rendered: (container) => {
					console.log('view currently showing is "the-default-view"');
					this.preventScroll();
				}
			}
		};
	}

	preventScroll() {
		document.querySelector('html').scrollTop = 0;
		document.querySelector('body').scrollTop = 0;
	}
}
