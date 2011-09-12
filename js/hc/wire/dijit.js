define(['require', 'dojo', 'when', 'wire/dojo/dijit'], function(require, dojo, when, dijitPlugin) {

	var dijitMap, tos, isArray, theme;
	dijitMap = {
		textbox:  'dijit/form/TextBox',
		select:   'dijit/form/FilteringSelect',
		combobox: 'dijit/form/ComboBox'
	};

	tos = Object.prototype.toString;
	isArray = Array.isArray || function(it) {
		return tos.call(it) == '[object Array]';
	};

	function createFactory(name, module) {
		return function(resolver, spec, wire) {
			var toWire = {
				create: {
					module: module,
					args: spec[name]
				}
			};

			when.chain(wire(toWire), resolver);
		}
	}

	var factories = {};

	for (var factory in dijitMap) {
		factories[factory] = createFactory(factory, dijitMap[factory]);
	}

	var loadTheme = function() {
		loadTheme = function() {};
		require(['css!' + 'dijit/themes/' + theme + '/' + theme + '.css']);
		dojo.addClass(dojo.body(), theme);
	};

	var plugin = {
		factories: factories,
		facets: {
			placeAt: {
				initialize: function(resolver, proxy, wire) {
					var dijit, nodeRef;

					dijit = proxy.target;
					nodeRef = proxy.options;

					if (dijit.placeAt) {
						wire(nodeRef).then(
							function(args) {
								dijit.placeAt.apply(dijit, isArray(args) ? args : [args]);
								resolver.resolve();
							},
							function(e) {
								resolver.reject(e);
							}
						);
					} else {
						resolver.reject("Not a dijit: " + proxy.path);
					}
				}
			}
		},
		resolvers: {
			datastore: function(resolver, name, refObj, wire) {
				when.chain(wire({
					create: {
						module: 'dojo/data/ObjectStore',
						args: { objectStore:
							{
								create: { module: 'dojo/store/JsonRest', args: { target: name } }
							}
						}
					}
				}), resolver);
			}
		}
	};

	return {
		wire$plugin: function(ready, destroy, options) {
			theme = options.theme;

			if(theme) loadTheme();

			var dp = dijitPlugin.wire$plugin(ready, destroy, options);
			dp.facets = plugin.facets;
			dp.factories = plugin.factories;
			dp.resolvers.datastore = plugin.resolvers.datastore;

			return dp;
		}
	}
});