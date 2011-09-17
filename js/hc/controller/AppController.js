define(['dojo', 'when'], function(dojo, when) {

	function noop() {}

	function AppController() {
	}

	AppController.prototype = {

		showPrefs: function() {
			var self = this;

			this._showPrefs().then(function(child) {

				self.showNotes = function() {
					child.destroy();
				};
			});
		},

		showNotes: noop,

		_showPrefs: noop,

		destroy: noop

	};

	return AppController;
});