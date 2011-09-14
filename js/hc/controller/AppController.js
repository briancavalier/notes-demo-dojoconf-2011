define(['dojo'], function(dojo) {

	function AppController() {
	}

	AppController.prototype = {
		init: function() {
			var self = this;
			this._wireChild().then(function(child) {
				self.destroy = function() {
					child.destroy();
				};
			});
		},
		destroy: function() {}
	};

	return AppController;
});