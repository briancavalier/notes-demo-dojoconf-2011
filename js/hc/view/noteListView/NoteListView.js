/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * NoteListView
 */

define(
[
	'dojo',
	'text!./NoteListView.html',
	'i18n!./nls/NoteListView',
	'dijit/_Widget',
	'dijit/_Templated',
	'css!./NoteListView.css',
	'dojo/NodeList-traverse'
],
function(dojo, template, strings, Widget, Templated) {

	var when;

	when = dojo.when;

	function noop() {}

	return dojo.declare([Widget, Templated], {

		templateString: template,
		
		strings: strings,

		noteTemplate: '<li class="note-item" data-note-id="{id}"><a href="#/note/{id}">{text}</a></li>',

		_notesById: {},

		onChange: function(note) {

		},

		_setNotesAttr: function(notes) {
			this._unobserveNotes();
			
			if(notes.observe) {
				var self = this;
				this._unobserveNotes = notes.observe(function(item, removedFrom, insertedInto) {
					self._handleNoteListChanged(item, removedFrom, insertedInto);
					self._unobserveNotes = noop;
				}).cancel;
			}

			when(notes, dojo.hitch(this, '_initNotes'));
		},

		_handleNoteSelected: function(e) {
			var note = dojo.query(e.target).closest('.note-item');
			if(note.length) {
				var id = note.attr('data-note-id');
				dojo.query('.selected', this.containerNode).removeClass('selected');
				note.addClass('selected');
				this.onChange(this._notesById[id[0]].note);
			}
		},

		_handleNoteListChanged: function(note, removedFrom, insertedInto) {
			// HACK!
			if(insertedInto === removedFrom || note.id in this._notesById) {
				this._updateNote(note, insertedInto);
			} else {
				if(removedFrom >= 0) {
					this._removeNote(note, removedFrom)
				}

				if(insertedInto >= 0) {
					this._insertNote(note, insertedInto);
				}

			}

		},

		_initNotes: function(notes) {
			this._clearNotes();

			dojo.forEach(notes, function(note) {
				this._insertNote(note, -1);
			}, this);
		},

		_clearNotes: function() {
			this._notesById = {};
			this.containerNode.innerHTML = '';
		},

		_insertNote: function(note, index) {
			var position, text, node;
			position = index < 0 ? 'last' : index;
			text = note.text ? note.text.slice(0, Math.min(note.text.length, 64)) : strings.emptyNoteText;
			node = dojo.place(dojo.replace(this.noteTemplate, { id: note.id, text: text }), this.containerNode, position);

			var inserted = {
				note: note,
				node: node
			};
			
			this._notesById[note.id] = inserted;
			return inserted;
		},

		_removeNote: function(note, index) {
			var removed = this._notesById[note.id];
			if(removed.node && removed.node.parentNode) {
				removed.node.parentNode.removeChild(removed.node);
				delete this._notesById[note.id];
			}

			return removed;
		},

		_updateNote: function(note, index) {
			var removed = this._removeNote(note, index);
			var inserted = this._insertNote(note, index);
			if(removed) {
				if(dojo.hasClass(removed.node, 'selected')) {
					dojo.addClass(inserted.node, 'selected');
				}
			}
		},

		_unobserveNotes: noop
		
	});

});
