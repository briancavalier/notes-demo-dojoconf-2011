/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * NotesController
 */

define([], function() {

	function NotesController() {
	}

	NotesController.prototype = {
		_saveInterval: 250, // configurable

		_noteView:     null, // injected
		_noteListView: null, // injected
		_notesStore:   null, // injected

		_newNote: { id: 999, text: '' },

		init: function() {
			this._getNotes();
			this._createNewNote();
		},

		_createNewNote: function() {
			this._newNote.id++;
			var newNote = dojo.clone(this._newNote);
			this._noteView.set('note', newNote);
		},

		_getNotes: function() {
			var promise = this._notesStore.query({});

			this._noteListView.set('notes', promise);
		},

		_handleNoteChanged: function(note) {
			if(this._saveTimeout) {
				clearTimeout(this._saveTimeout);
				this._saveTimeout = null;
			}

			var self = this;
			this._saveTimeout = setTimeout(function() {
				if(self._saveTimeout) {
					self._saveNote(note);
				}
			}, this._saveInterval);
		},

		_saveNote: function(note) {
			this._notesStore[note.id ? "put" : "add"](note);
		},

		_handleNoteSelected: function(note) {
			this._noteView.set('note', note);
		}
	};

	return NotesController;
});
