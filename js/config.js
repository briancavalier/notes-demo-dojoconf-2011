(function(global) {

	global.curl = {
//                debug: true,
		baseUrl: 'js/',
		paths: {
			curl: 'curl/src/curl',
			i18n: './i18n'
		},
		packages: [
			{ name: 'dojo', path: 'dojo', lib: '.', main: './lib/main-browser' },
			{ name: 'dijit', path: 'dijit', lib: '.', main: './lib/main' },
			{ name: 'aop', path: 'aop', main: 'aop' },
			{ name: 'when', path: 'when', main: 'when' },
			{ name: 'wire', path: 'wire', lib: './wire', main: 'wire' }
		]
	};

})(this);
