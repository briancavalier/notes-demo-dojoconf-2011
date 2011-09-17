/*
 * Copyright (c) 2011, Your Company, Inc. All rights reserved.
 *
 * AdaptStoreQueries
 */

define(
[
	'dojo/store/JsonRest',
	'dojo/store/Observable',
	'when'
],
function(JsonRest, makeObservable, when) {

	return {
		pointcut: function(object) {
			return object instanceof JsonRest ? ['put', 'add'] : [];
		},
		
		around: function(joinpoint) {
			var store = joinpoint.target;
			if(!store.notify) {
				makeObservable(store);
			}

			var object = joinpoint.args[0];

			console.log("SAVED " + joinpoint.target.target, object);

			joinpoint.target.notify(object, store.getIdentity(object));

			var deferred = when.defer();
			deferred.resolve();
			return deferred.promise;
		}
	};
	
});
