import TdClient from './tdweb.js';
import apiConfig from './api-tlg';
import { getOSName, getBrowser } from './utils';

class Client {
	constructor(options) {
		this.client = new TdClient(options);
	}

	send(request) {
		this.client
			.send(request)
			.then((result) => {
				console.log('receive result', result);
				return result;
			})
			.catch((error) => {
				console.error('catch error', error);
				throw error;
			});
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
				use_test_dc: useTestDC,
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
				files_directory: '/'
			}
		});
	}

	setAuthenticationPhoneNumber(phone) {
		this.send({
			'@type': 'setAuthenticationPhoneNumber',
			phone_number: phone
		});
	}
}
