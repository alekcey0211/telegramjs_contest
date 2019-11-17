import TdClient from './tdweb.js';
import { apiConfig, options } from './config';
import { getOSName, getBrowser, isValidPhoneNumber } from './utils';
import Cookies from 'universal-cookie';
import {
	CHAT_SLICE_LIMIT
} from './constants.js';
import dateFormat from 'dateformat';

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

			getMessageDate(message) {
				const date = new Date(message.date * 1000);
		
				const dayStart = new Date();
				dayStart.setHours(0, 0, 0, 0);
				if (date > dayStart) {
						return dateFormat(date, 'H:MM');
				}
		
				const now = new Date();
				const day = now.getDay();
				const weekStart = now.getDate() - day + (day === 0 ? -6 : 1);
				const monday = new Date(now.setDate(weekStart));
				if (date > monday) {
						return dateFormat(date, 'ddd');
				}
		
				return dateFormat(date, 'd.mm.yyyy');
		}

			getChats() {
				let offsetOrder = '9223372036854775807'; // 2^63 - 1
				let offsetChatId = 0;
				return this.send({
						'@type': 'getChats',
						offset_chat_id: offsetChatId,
						offset_order: offsetOrder,
						limit: CHAT_SLICE_LIMIT
				})
			}

			getChat(chatId) {
				return this.send({
					'@type': 'getChat',
					chat_id: chatId
				})
			}

			loadClientData() {
        const cookies = new Cookies();
        const clientData = new Map();
        try {
            const data = cookies.get('clientData');
            Object.keys(data).forEach(key => {
                clientData.set(Number(key), data[key]);
            });
        } catch {}

        this.clientData = clientData;
    };

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
