define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dojo/dom' },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/aop' }
	],
	controller: {
		create: 'hc/controller/DemoController',
		properties: {
			_context: { $ref: 'wire!context' }
		},
		init: 'init'
	}
});