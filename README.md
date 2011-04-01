Persival
========

Persival can persist the values users entered in a form, 
to make them crash and *inadvertent tab closing* resilent.

Usage
-----

Asking persival to watch a form for changes and persist the values is really simple:

	$("#form1").persival();
	// You can give it an id if you have different forms in your pages.
	$("#form1").persival( "firstForm" );

Once the form has been successfully submited, you can clear the persisted values:

	$.clearPersival( "firstForm" );

Author
------

[@louis_remi](http://twitter.com/louis_remi)

License
-------

Released under the MIT license.