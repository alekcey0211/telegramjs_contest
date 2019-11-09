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
	hash: '3a09d4c0350101454cfac7d7e7621773'
};

export const parameters = {
	useTestDC: false,
	readOnly: false,
	verbosity: 1,
	jsVerbosity: 3,
	fastUpdating: true,
	useDatabase: false,
	mode: 'wasm'
};

export const { verbosity, jsVerbosity, useTestDC, readOnly, fastUpdating, useDatabase, mode } = parameters;

export const options = {
	logVerbosityLevel: verbosity,
	jsLogVerbosityLevel: jsVerbosity,
	mode: mode,
	prefix: useTestDC ? 'tdlib_test' : 'tdlib',
	readOnly: readOnly,
	isBackground: false,
	useDatabase: useDatabase,
	wasmUrl: `${WASM_FILE_NAME}?_sw-precache=${WASM_FILE_HASH}`
};