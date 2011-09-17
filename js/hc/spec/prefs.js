define({
	// wire plugins
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
	// Jobs reference data.
	// Since we're injecting into a dijit, we need to use
	// a dojo/data type store, or an ObjectStore adapter.
	// The hc/wire/dijit plugin provides a datastore!
	// resolver for that.
	jobsStore: { $ref: 'datastore!js/data/jobs/index.json' },
	//
	// The main prefs view
	view: {
		create: {
			module: 'hc/view/prefsView/PrefsView',
			// We can inject dependencies via constructor args, too!
			args: {
				jobsStore: { $ref: 'jobsStore' },
				value: { $ref: 'resource!js/data/prefs/', get: 1 }
			}
		},
		// Again, the placeAt feature is provided by the
		// hc/wire/dijit plugin
		placeAt: { $ref: 'dom!dialog-container' },
		// During wire's "initialize" phase, call the
		// view's focus() method
		init: 'focus'
	},
	//
	// Prefs controller
	controller: {
		create: 'hc/controller/PrefsController',
		// Inject references to the view and a prefs store
		properties: {
			_prefsStore: { $ref: 'resource!js/data/prefs' },
			_prefsView:  { $ref: 'view' }
		},
		connect: {
			// Connect view events.
			view: {
				onSave: '_savePrefs'
			},
			// Also connect back to appController.  Could
			// use pubsub here via the wire/dojo/pubsub
			// connector, too
			prefsSaved: {
				appController: 'showNotes'
			}
		}
	}
});