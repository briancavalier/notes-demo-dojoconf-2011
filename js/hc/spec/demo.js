define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dojo/dom' },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' },
		{ module: 'wire/aop' },
		{ module: 'hc/wire/dijit', theme: 'claro' }
	],
	name: {
		textbox: [{}, { $ref: 'dom.query!#name', i:0 } ]
	},
//	jobStore: {
//		create: {
//			module: 'dojo/data/ObjectStore',
//			args: [{ objectStore: { $ref: 'resource!js/data/jobs/index.json' } }]
//		}
//	},
	job:  {
		combobox: [{ store: { $ref: 'datastore!js/data/jobs/index.json' } }, { $ref: 'dom.query!#occupation', i:0 }]
	}
});