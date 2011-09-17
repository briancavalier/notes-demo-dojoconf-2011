/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * NoteView
 */

define(
[
	'dojo',
	'text!./noteView/NoteView.html',
	'i18n!./noteView/nls/NoteView',
	'dijit/_Widget',
	'dijit/_Templated',
	'dijit/form/SimpleTextarea',
	'css!./noteView/NoteView.css'
],
function(dojo, template, strings, Widget, Templated) {

	var states;

	states = {
		editing: 'editing'
	};

	return dojo.declare([Widget, Templated], {

		templateString: template,
		
		strings: strings,

		postCreate: function() {
			this.inherited(arguments);
		},

		_onChange: function(e) {
			if(!this._note) return;

			var self = this;
			setTimeout(function() {
				self._note.text = self.get('value');
				self.onChange(self._note);
			});
		},

		onChange: function(note) {},

		_setNoteAttr: function(note) {
			if(note) {
				this._note = note;
				this.set('value', note.text);
			} else {
				this.set('value', '');
			}

			this.noteText.disabled = !note;
			dojo.toggleClass(this.domNode, states.editing, !!note);
		},

		_setValueAttr: function(text) {
			this.noteText.value = text;
		},

		_getValueAttr: function() {
			return this.noteText.value;
		}

	});

});
