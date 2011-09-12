define(['dojo'], function(dojo) {

	function DemoController() {

	}

	DemoController.prototype = {
		init: function() {
			this._context.wire('hc/spec/demo');
		}
	};

	return DemoController;
});