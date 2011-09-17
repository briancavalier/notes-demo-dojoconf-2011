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
			var self = this;
			this._prefsStore.put(prefs).then(function() {
				self._prefsView.set('value', prefs);
				self.prefsSaved();
			});
		},

		prefsSaved: function() {}
	};

	return PrefsController;

});
