import TdClient from './tdweb.js';
import { apiConfig, options } from './config';
import { getOSName, getBrowser, isValidPhoneNumber } from './utils';

export class Client {
			constructor() {
				this.client = new TdClient(options);
				this.config = apiConfig;
			}

			send(request) {
				return this.client.send(request);
			}

			getAuthorizationState() {
				return this.send({
					'@type': 'getAuthorizationState'
				})
			}

			getContacts() {
				return this.send({
					'@type': 'getContacts'
				})
			}

			getUser(userId) {
				return this.send({
					'@type': 'getUser',
					user_id: userId
				})
			}

			checkAuthenticationCode(code) {
				return this.send({
					'@type': 'checkAuthenticationCode',
					code: code,
					first_name: 'A',
					last_name: 'B'
				})
			}

			checkAuthenticationPassword(password) {
				return this.send({
					'@type': 'checkAuthenticationPassword',
					password: password
				})
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
