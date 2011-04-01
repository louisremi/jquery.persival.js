/* Persival can persist the values users entered in a form,
 * to make them "inadvertent tab closing" & crash resilent.
 * 
 * Dependencies:
 * - jquery: http://github.com/jquery/jquery
 * - store.js: http://github.com/lrbabe/store.js
 * - store.space.js: http://github.com/lrbabe/store.space.js
 * Complete instructions and latest version available on Github: http://github.com/lrbabe/jquery.persival.js
 * 
 * author: @louis_remi
 * license: MIT
 */
(function($, store) {

var persivalSpace = 'persival-';

$.fn.persival = function( id ) {
	var idName = 'persivalId',
		pstore = store.space(persivalSpace + (id || '') );

	return this.each(function( i ) {
		// change listener
		$(this).delegate('input, textarea, select', 'change keypress', function(e) {
			var $target = $(e.target),
				curId = $target.data(idName);
			// persist the value
			pstore( curId, (e.target.nodeName.toLowerCase() == 'select' ?
				$target.find(':selected'):
				$target
			).val() );

		// give a unique identifier to each input
		}).find('input, textarea, select').each(function( j ) {
			var curId = i + '-' + j,
				curVal = pstore(curId),
				$this = $(this).data( idName, curId );
			// restore persisted value
			if ( curVal !== undefined ) {
				this.nodeName.toLowerCase() == 'select'?
					$this
						.find(':selected').removeAttr('selected').end()
						.find('option[value="'+ curVal +'"]').attr('selected', 'selected'):
					$this.val(curVal);
			}
		});
	});
};

$.clearPersival = function(id) {
	store.space( 'persival-' + (id || '') ).clear();
}

})(jQuery, store);