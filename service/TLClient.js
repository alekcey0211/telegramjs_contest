var express = require('express');
var router = express.Router();
var TdClient = require ('../src/js/tdweb/dist/tdweb');

/* GET users listing. */
router.get('/', function(req, res, next) {
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
		wasmUrl: `b4b0d61282108a31908dd6b2dbd7067b.wasm?_sw-precache=b4b0d61282108a31908dd6b2dbd7067b`
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
      res.send('done')
			console.log('done');
		});
});

module.exports = router;
