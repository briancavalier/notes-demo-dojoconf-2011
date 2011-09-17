define({
	plugins: [
//		{ module: 'wire/debug' },
		{ module: 'wire/dom', classes: { init: 'loading', ready: 'notes-ready' } },
		{ module: 'wire/dojo/events' },
		{ module: 'wire/dojo/store' },
		{ module: 'hc/wire/dijit', theme: 'claro' },
		{
			module: 'wire/aop',
			aspects: [ 'storeAdvice' ]
		}
	],
	appController: {
		create: 'hc/controller/AppController',
		properties: {
			_showPrefs: { wire: { spec: 'hc/spec/prefs', defer: true } }
		},
		connect: {
			headerView: {
				onPrefs:   'showPrefs'
			}
		}
	},
	headerView: {
		create: {
			module: 'hc/view/headerView/HeaderView',
			args: [{}, { $ref: 'dom!main-header' }]
		}
	},
	noteController: {
		create: 'hc/controller/NotesController',
		properties: {
			_noteView: { $ref: 'noteView' },
			_noteListView: { $ref: 'noteListView' },
			_notesStore: { $ref: 'notesStore' }
		},
		connect: {
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
	notesStore: {
		create: {
			module: 'dojo/store/JsonRest',
			args: { target: 'js/data/notes/' }
		},
		decorate: {
			observable: []
		}
	},
	storeAdvice: { create: 'hc/aspects/AdaptStoreQueries' },
	observable: { module: 'dojo/store/Observable' },
	noteListView: {
		create: {
			module: 'hc/view/noteListView/NoteListView',
			args: {}
		},
		placeAt: { $ref: 'dom!note-list' }
	},
	noteView: {
		create: {
			module: 'hc/view/noteView/NoteView',
			args: {}
		},
		placeAt: { $ref: 'dom!note' }
	}
});