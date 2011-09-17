define({
	// wire plugins
	// wire will detect these no matter where you put them
	// An array just seems convenient
	plugins: [
		// debug firehose
//		{ module: 'wire/debug' },
		{ module: 'wire/dom', classes: { init: 'loading', ready: 'notes-ready' } },
		// Use dojo.connect for event connections
		{ module: 'wire/dojo/events' },
		// Pull in dojo/store features, like the resource! resolver
		{ module: 'wire/dojo/store' },
		// Use dijit plugin to auto-theme
		{ module: 'hc/wire/dijit', theme: 'claro' },
		// Let's do some AOP!
		{
			module: 'wire/aop',
			aspects: [ 'storeAdvice' ]
		}
	],
	//
	// Create the app controller
	appController: {
		create: 'hc/controller/AppController',
		properties: {
			// Whoah! inject a function that will launch
			// the User Prefs area from another wire spec!
			_showPrefs: { wire: { spec: 'hc/spec/prefs', defer: true } }
		},
		connect: {
			// dojo.connect headerView's onPrefs event to
			// appControllers's showPrefs function
			headerView: {
				onPrefs:   'showPrefs'
			}
		}
	},
	//
	// Header
	headerView: {
		// Create a dijit-based view on the #main-header node
		create: {
			module: 'hc/view/headerView/HeaderView',
			args: [{}, { $ref: 'dom!main-header' }]
		}
	},
	//
	// Notes controller
	noteController: {
		create: 'hc/controller/NotesController',
		// Inject references to views and the notes store
		properties: {
			_noteView: { $ref: 'noteView' },
			_noteListView: { $ref: 'noteListView' },
			_notesStore: { $ref: 'notesStore' }
		},
		connect: {
			// Connect view events
			headerView: {
				onNewNote: '_createNewNote'
			},
			noteView: {
				onChange: '_handleNoteChanged'
			},
			noteListView: {
				onChange: '_handleNoteSelected'
			}
		},
		init: 'init'
	},
	//
	// Create a JsonRest store for the notes, and
	// make it Observable!
	notesStore: {
		create: {
			module: 'dojo/store/JsonRest',
			args: { target: 'js/data/notes/' }
		},
		decorate: {
			observable: []
		}
	},
	//
	// AOP aspect that will be applied by wire/aop plugin
	storeAdvice: { create: 'hc/aspects/AdaptStoreQueries' },
	//
	// dojo/store/Observable decorator
	observable: { module: 'dojo/store/Observable' },
	//
	// List of notes
	noteListView: {
		create: {
			module: 'hc/view/noteListView/NoteListView',
			args: {}
		},
		// The hc/wire/dijit plugin adds the placeAt
		// feature to wire for dijits
		placeAt: { $ref: 'dom!note-list' }
	},
	// The note editor view
	noteView: {
		create: {
			module: 'hc/view/noteView/NoteView',
			args: {}
		},
		placeAt: { $ref: 'dom!note' }
	}
});