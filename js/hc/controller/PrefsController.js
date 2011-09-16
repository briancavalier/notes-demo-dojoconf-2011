/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * PrefsController
 */

define(
[

],
function() {

	function PrefsController() {

	}

	PrefsController.prototype = {

		_prefsStore: null,  //injected
		
		_savePrefs: function(prefs) {
			console.log(prefs);

			var self = this;
			this._prefsStore.put(prefs).then(function() {
				self.prefsSaved();
			});
		},

		prefsSaved: function() {}
	};

	return PrefsController;

});
