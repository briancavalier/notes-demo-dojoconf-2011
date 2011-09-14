define({
	plugins: [
		{ module: 'wire/debug' }
	],
	controller: {
		create: 'hc/controller/AppController',
		properties: {
			_wireChild: { wire: { spec: 'hc/spec/demo', defer: true } }
		},
		init: 'init'
	}
});