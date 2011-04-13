/* localStorage polyfill with shorter API
 * 
 * inspired by and API compliant with @marcuswestins's store.js
 * Complete script and instructions available on github: https://github.com/louisremi/store.js/s
 * 
 * author: @louis_remi
 * license: MIT
 */
(function(win, undefined) {

var _localStorage = 'localStorage',
	_globalStorage = 'globalStorage',
	doc = win.document,
	storage,
	support = true,
	store = {
		get: function(key) {
			return JSON.parse( storage.getItem(key) );
		},
		set: function(key, value) {
			return storage.setItem( key, JSON.stringify(value) );
		}
	};

if ( _localStorage in win ) {
	// support will be false if about.config::dom.storage.enabled === false
	try {
		storage = win[_localStorage];
		// it is illegal to simply use store.remove as a reference to storage.removeItem :(
		store.remove = function(key) { 
			storage.removeItem(key); 
		};
		store.clear = function() {
			storage.clear();
		}
	} catch(e) { support = false; }

// Firefox 2 fallback
} else if ( _globalStorage in win ) {
	storage = win[_globalStorage][win.location.hostname];

	store.remove = function(key) {
		delete storage[key];
	};
	store.clear = function() {
		for ( var key in storage ) {
			delete storage[key];
		}
	};
}

store.support = support;

win.store = store;

})(window);