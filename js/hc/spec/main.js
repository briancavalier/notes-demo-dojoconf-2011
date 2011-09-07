define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dojo/dom' },
		{ module: 'wire/dojo/dijit' },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' }
	],
	test: { $ref: 'dom.query!#test', i: 0 }
});