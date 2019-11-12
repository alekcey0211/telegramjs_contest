import TdClient from './tdweb.js';
import { apiConfig, options } from './api-tlg';
import { getOSName, getBrowser, isValidPhoneNumber } from './utils';

export class Client {
			constructor() {
				this.client = new TdClient(options);
				this.config = apiConfig;
			}

			send(request) {
				return this.client.send(request);
				// .then((result) => {
				// 	console.log('receive result', result);
				// 	return result;
				// })
				// .catch((error) => {
				// 	console.error('catch error', error);
				// 	throw error;
				// });
			}

			checkAuthenticationCode(code) {
				return this.send({
					'@type': 'checkAuthenticationCode',
					code: code,
					first_name: 'A',
					last_name: 'B'
				})
					// .then((result) => {})
					// .catch((error) => {
					// 	let errorString = null;
					// 	if (error && error['@type'] === 'error' && error.message) {
					// 		errorString = error.message;
					// 	} else {
					// 		errorString = JSON.stringify(error);
					// 	}
					// 	console.error(errorString);
					// });
			}

			checkDatabaseEncryptionKey() {
				this.send({
					'@type': 'checkDatabaseEncryptionKey'
				});
			}

			setTdlibParameters() {
				this.send({
					'@type': 'setTdlibParameters',
					parameters: {
						'@type': 'tdParameters',
						use_test_dc: false,
						api_id: apiConfig.id,
						api_hash: apiConfig.hash,
						system_language_code: navigator.language || 'en',
						device_model: getBrowser(),
						system_version: getOSName(),
						application_version: '1.0.0',
						use_secret_chats: false,
						use_message_database: true,
						use_file_database: false,
						database_directory: '/db',
						files_directory: '/',
						authentication_code_type_sms: true
					}
				});
			}

			setAuthenticationPhoneNumber(phone) {
				if (isValidPhoneNumber(phone)) {
					return this.send({
						'@type': 'setAuthenticationPhoneNumber',
						phone_number: phone
					});
				} else {
					console.error(`Telephone number ${phone} is not valid`);
				}
			}
		}
