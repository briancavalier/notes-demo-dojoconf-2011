define({
	plugins: [
//		{ module: 'wire/debug' },
		{ module: 'wire/dom', classes: { init: 'prefs-loading', ready: 'prefs-ready'} },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' },
		{ module: 'hc/wire/dijit' },
		{
			module: 'wire/aop',
			aspects: [ 'storeAdvice' ]
		}
	],
	jobsStore: { $ref: 'datastore!js/data/jobs/index.json' },
	view: {
		create: {
			module: 'hc/view/prefsView/PrefsView',
			args: {
				jobsStore: { $ref: 'jobsStore' },
				value: { $ref: 'resource!js/data/prefs/', get: 1 }
			}
		},
		placeAt: { $ref: 'dom!dialog-container' },
		init: 'focus'
	},
	controller: {
		create: 'hc/controller/PrefsController',
		properties: {
			_prefsStore: { $ref: 'resource!js/data/prefs' },
			_prefsView:  { $ref: 'view' }
		},
		connect: {
			view: {
				onSave: '_savePrefs'
			},
			prefsSaved: {
				appController: 'showNotes'
			}
		}
	}
});