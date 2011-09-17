/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * HeaderView
 */

define(
[
	'dojo',
	'text!./headerView/HeaderView.html',
	'i18n!./headerView/nls/HeaderView',
	'dijit/_Widget',
	'dijit/_Templated',
	'css!./headerView/HeaderView.css'
],
function(dojo, template, strings, Widget, Templated) {

	return dojo.declare([Widget, Templated], {

		templateString: template,
		
		strings: strings,

		_handleNewNote: function(e) {
			e.preventDefault();

			this.onNewNote();
		},

		_handlePrefs: function(e) {
			e.preventDefault();

			this.onPrefs();
		},

		onNewNote: function() {},

		onPrefs: function() {}
		
	});

});
