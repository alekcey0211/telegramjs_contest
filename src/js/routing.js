import { ConfirmCodePage } from './confirm-code-page';
import { LoginPage } from './login-page';
import { Client } from './client';
import { PasswordPage } from './password-page';
import { type } from 'os';
import { MainPage } from './main-page';

export class Routing {
	constructor() {
		this.route = {
			login: {
				rendered: (container) => {
					client.getAuthorizationState()
					.then((result) => {
						console.log('receive result from login', result);
						return result;
					})
					new LoginPage(container);
					this.preventScroll();
				}
			},
			'main-page': {
				rendered: (container) => {
					client.getAuthorizationState()
					.then((result) => {
						console.log('receive result from main-page', result);
						return result;
					})
					new MainPage(container);
					this.preventScroll();
				}
			},
			'confirm-code': {
				rendered: (container) => {
					client.getAuthorizationState()
					.then((result) => {
						console.log('receive result from confirm-code', result);
						return result;
					})
					new ConfirmCodePage(container);
					this.preventScroll();
				}
			},
			'password': {
				rendered: (container) => {
					client.getAuthorizationState()
						.then((result) => {
							console.log('receive result from password', result);
							return result;
						})
					new PasswordPage(container)
					this.preventScroll();
				}
			},
			'init-client': {
				rendered: () => {
					window.client = new Client();
					client.setTdlibParameters();
					client.checkDatabaseEncryptionKey();

					client.getAuthorizationState()
					.then((result) => {
							let clientState = "";
							console.log('receive result from init-client', result);
							clientState = result;

							//Если не авторизированный пользователь, то на страницу логина, иначе на главную
							if (clientState['@type'] === 'authorizationStateWaitPhoneNumber') {
								window.location.hash = '#login';
							} else if (clientState['@type'] === 'authorizationStateReady') {
								window.location.hash = '#main-page';
							}

							return result;
						})
						.catch((error) => {
							console.error('catch error', error);
							throw error;
						});
					
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
