import { ConfirmCodePage } from './confirm-code-page';
import { LoginPage } from './login-page';
import { Client } from './client';

export class Routing {
	constructor() {
		this.route = {
			login: {
				rendered: (container) => {
					new LoginPage(container);
					this.preventScroll();
				}
			},
			'confirm-code': {
				rendered: (container) => {
					console.log('code');
					new ConfirmCodePage(container);
					this.preventScroll();
				}
			},
			'init-client': {
				rendered: () => {
					window.client = new Client();
					client.setTdlibParameters();
					client.checkDatabaseEncryptionKey();

					//Если не авторизированный пользователь, то на страницу логина, иначе на главную
					if (1 == 1) {
						window.location.hash = '#login';
					} else {
						window.location.hash = '#main';
					}
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
