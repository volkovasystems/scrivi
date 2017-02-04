const lire = require( "./scrivi.js" );

console.log( scrivi( "./hello.world", "hello world", true ) )

lire( "./package.json" )
	( function done( error, result ){
		console.log( arguments );
	} );
