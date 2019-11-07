import TdClient from './tdweb.js';

import {
	VERBOSITY_JS_MAX,
	VERBOSITY_JS_MIN,
	VERBOSITY_MAX,
	VERBOSITY_MIN,
	WASM_FILE_HASH,
	WASM_FILE_NAME
} from './constants.js';

export const apiConfig = {
	id: 1193467,
	hash: '3a09d4c0350101454cfac7d7e7621773',
	tel: '+79260737171'
};

const main = async () => {
	let parameters = {
		useTestDC: false,
		readOnly: false,
		verbosity: 1,
		jsVerbosity: 3,
		fastUpdating: true,
		useDatabase: false,
		mode: 'wasm'
	};

	const { verbosity, jsVerbosity, useTestDC, readOnly, fastUpdating, useDatabase, mode } = parameters;

	let options = {
		logVerbosityLevel: verbosity,
		jsLogVerbosityLevel: jsVerbosity,
		mode: mode, // 'wasm-streaming'/'wasm'/'asmjs'
		prefix: useTestDC ? 'tdlib_test' : 'tdlib',
		readOnly: readOnly,
		isBackground: false,
		useDatabase: useDatabase,
		wasmUrl: `${WASM_FILE_NAME}?_sw-precache=${WASM_FILE_HASH}`
		// onUpdate: update => this.emit('update', update)
	};

	const client = new TdClient(options);
	let code = '222';
	const request = {
		'@type': 'sendAuthenticationCode'
	};
	client
		.send(request)
		.then((result) => {
			console.log('receive result', result);
			return result;
		})
		.catch((error) => {
			console.error('catch error', error);
			throw error;
		})
		.then((result) => {})
		.catch((error) => {
			let errorString = null;
			if (error && error['@type'] === 'error' && error.message) {
				errorString = error.message;
			} else {
				errorString = JSON.stringify(error);
			}
		})
		.finally(() => {
			console.log('done');
		});
};

main();
