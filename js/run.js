(function(global) {

	var config = {
//                debug: true,
		baseUrl: 'js',
		paths: {
			i18n: './i18n'
		},
		packages: [
			{ name: 'dojo',  location: 'dojo',  main: './lib/main-browser' },
			{ name: 'dijit', location: 'dijit', main: './lib/main' },
			{ name: 'wire',  location: 'wire',  main: 'wire' },
			{ name: 'curl',  location: 'curl/src/curl' },
			{ name: 'when',  location: 'when',  main: 'when' },
			{ name: 'aop',   location: 'aop',   main: 'aop' }
		]
	};

	curl(config, ['curl/shim/dojo16', 'wire!hc/spec/main']);

})(this);
