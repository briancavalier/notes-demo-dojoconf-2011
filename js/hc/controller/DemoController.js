define(['dojo'], function(dojo) {

	function DemoController() {

	}

	DemoController.prototype = {
		init: function() {
			this._wireChild('hc/spec/demo');
		}
	};

	return DemoController;
});