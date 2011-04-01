(function(store, delimiter, undefined) {

var _index = '_index',
	dL = delimiter.length;

store.space = function(name) {
	var uname = store.get(name),
		index = '',
		space = function(key, value) {
			// get
			if ( value === undefined ) {
				return store.get(uname + '-' + key);

			// set
			} else {
				// add the key to the index if it does not already exist
				if ( !~( delimiter + index + delimiter ).indexOf(delimiter + key + delimiter) ) {
					store.set( uname + _index, index += ( index ? delimiter : '' ) + key );
				}
				// add the item to the store
				store.set( uname + '-' + key, value );
			}
		};

	space.remove = function(key) {
		// remove the key from the index
		store.set(uname + _index, ( delimiter + index + delimiter ).split( delimiter + key + delimiter ).join(delimiter).slice(dL, -dL) )
		// remove the item from the store
		store.remove(uname + '-' + key);
	};

	space.clear = function() {
		var keys = index.split(delimiter),
			i = keys.length;
		while ( i-- ) {
			store.remove(uname + '-' + keys[i]);
		}
		store.remove(uname + _index);
	};

	space.get = space.set = space;

	if ( !uname ) {
		uname = name + '-' + (Math.random() * 1E4 |0);
		store.set( name, uname );
	} else {
		index = store.get(uname + _index);
	}
	return space;
}

})(store, '#_s_#');