define({
	plugins: [
		{ module: 'wire/debug' }
	],
	controller: {
		create: 'hc/controller/DemoController',
		properties: {
			_wireChild: { $ref: 'wire!' }
		},
		init: 'init'
	}
});