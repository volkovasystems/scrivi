const scrivi = require( "./scrivi.js" );

console.log( scrivi( "./hello.world", "hello world", true ) )

scrivi( "./hello.world", "yeah world" )
	( function done( error, result ){
		console.log( arguments );
	} );
