define({
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dom', classes: { init: 'prefs-loading', ready: 'prefs-ready'} },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' },
		{ module: 'hc/wire/dijit' },
		{
			module: 'wire/aop',
			aspects: [ 'storeAdvice' ]
		}
	],
	jobsModel: { $ref: 'datastore!js/data/jobs/index.json' },
	view: {
		create: {
			module: 'hc/view/prefsView/PrefsView',
			args: {
				jobsModel: { $ref: 'jobsModel' }
			}
		},
		placeAt: { $ref: 'dom!dialog-container' },
		init: 'focus'
	},
	controller: {
		create: 'hc/controller/PrefsController',
		properties: {
			_prefsStore: { $ref: 'resource!js/data/prefs' }
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