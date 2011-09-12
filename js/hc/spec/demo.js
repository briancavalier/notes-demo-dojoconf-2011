define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dojo/dom' },
		{ module: 'wire/dojo/dijit' },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' },
		{ module: 'wire/aop' },
		{ module: 'hc/wire/dijit', theme: 'claro' }
	],
//	css: [
//		{ module: 'css!dijit/themes/claro/claro.css' }
//	],
	form: {
		name: { textbox: [{}, { $ref: 'dom.query!#name', i:0 }] },
		job:  {
			combobox: [{ placeholder: 'What do you do?' }, { $ref: 'dom.query!#occupation', i:0 }],
			properties: {
//				placeholder: 'What do you do?'
//				,
//				store: {
//					create: 'dojo/data/ObjectStore',
//					args: {
//						objectStore: { $ref: 'resource!data/jobs' }
//					}
//				}
			}
		}
	}
});