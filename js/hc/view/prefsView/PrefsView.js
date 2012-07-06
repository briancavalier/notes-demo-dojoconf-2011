/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * PrefsView
 */

define(
[
	'dojo',
	'dijit',
	'when',
	'text!./PrefsView.html',
	'i18n!./nls/PrefsView',
	'dijit/_Widget',
	'dijit/_Templated',
	'dijit/form/TextBox',
	'dijit/form/ComboBox',
	'dijit/form/Button',
	'css!./PrefsView.css'
],
function(dojo, dijit, when, template, strings, Widget, Templated) {

	// package emulation
	return dojo.declare('hc.view.PrefsView', [Widget, Templated], {

		templateString: template,
		
		strings: strings,

		widgetsInTemplate: true,

		attributeMap: dojo.delegate(Widget.prototype.attributeMap, {
			jobsStore: { node: 'jobInput', attribute: 'store' }
		}),

		onSave: function(data) {
		},

		_handleSubmit: function(e) {
			e.preventDefault();

			// TODO: Send data along with event
			this.onSave(dojo.formToObject(this.formNode));
		},

		_setValueAttr: function(prefs) {
			var self = this;
			when(prefs, function(prefs) {
				self.nameInput.set('value', prefs.name);
				self.emailInput.set('value', prefs.email);
				self.jobInput.set('value', prefs.job);
			});
		},

		focus: function() {
			var focusNode = this.focusNode;
			setTimeout(function() { focusNode.focus(); });
		}
	});

});
