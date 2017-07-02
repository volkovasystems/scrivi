const assert = require( "assert" );
const scrivi = require( "./scrivi.js" );

assert.equal( scrivi( "./hello.world", "hello world", true ),
				false, "should be false" );

scrivi( "./test.txt", "yeah world" )
	( function done( error, result ){
		assert.equal( result, true, "should be true" );
	} );

console.log( "ok" );
