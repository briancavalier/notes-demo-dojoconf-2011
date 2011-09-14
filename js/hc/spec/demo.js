define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dom', classes: { init: 'loading' } },
		{ module: 'wire/dojo/dom' },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' },
		{ module: 'wire/aop' },
		{ module: 'hc/wire/dijit', theme: 'claro' }
	],
	name: {
		textbox: [{}, { $ref: 'dom.query!#name', i:0 } ]
	},
	job:  {
		combobox: [
			{ store: { $ref: 'datastore!js/data/jobs/index.json' } },
			{ $ref: 'dom.query!#occupation', i:0 }
		]
	}
});