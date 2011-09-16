/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * PrefsView
 */

define(
[
	'dojo',
	'dijit',
	'text!./prefsView/PrefsView.html',
	'i18n!./prefsView/nls/PrefsView',
	'dijit/_Widget',
	'dijit/_Templated',
	'dijit/form/TextBox',
	'dijit/form/ComboBox',
	'dijit/form/Button',
	'css!./prefsView/PrefsView.css'
],
function(dojo, dijit, template, strings, Widget, Templated) {

	// package emulation
	return dojo.declare('hc.view.PrefsView', [Widget, Templated], {

		templateString: template,
		
		strings: strings,

		widgetsInTemplate: true,

		attributeMap: dojo.delegate(Widget.prototype.attributeMap, {
			jobsModel: { node: 'jobInput', attribute: 'store' }
		}),

		onSave: function(data) {
		},

		_handleSubmit: function(e) {
			e.preventDefault();

			// TODO: Send data along with event
			this.onSave(dojo.formToObject(this.formNode));
		},

		focus: function() {
			var focusNode = this.focusNode;
			setTimeout(function() { focusNode.focus(); });
		}
	});

});
