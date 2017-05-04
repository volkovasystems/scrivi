const assert = require( "assert" );
const scrivi = require( "./scrivi.js" );

assert.equal( scrivi( "./hello.world", "hello world", true ), false, "should be false" );

scrivi( "./hello.world", "yeah world" )
	( function done( error, result ){
		console.log( arguments );
	} );

console.log( "ok" );
