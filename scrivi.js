"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "scrivi",
			"path": "scrivi/scrivi.js",
			"file": "scrivi.js",
			"module": "scrivi",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com:volkovasystems/scrivi.git",
			"test": "scrivi-test.js",
			"global": true,
			"class": true
		}
	@end-module-configuration

	@module-documentation:
		Replace content of existing file.
	@end-module-documentation

	@include:
		{
			"fs": "fs",
			"kept": "kept",
			"letgo": "letgo"
		}
	@end-include
*/

var fs = require( "fs" );
var kept = require( "kept" );
var letgo = require( "letgo" );

var scrivi = function scrivi( path, content, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"content:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( typeof path != "string" ||
		!path )
	{
		throw new Error( "invalid path" );
	}

	if( typeof content != "string" ||
		!content )
	{
		throw new Error( "invalid content" );
	}

	if( synchronous ){
		try{
			if( kept( path, WRITE, synchronous ) ){
				try{
					fs.writeFileSync( path, content );

					return true;

				}catch( error ){
					throw new Error( "error writing file, " + error.message );
				}

			}else{
				return false;
			}

		}catch( error ){
			throw new Error( "error checking file if writing, " + error.message );
		}

	}else{
		var catcher = letgo.bind( this )( );

		kept( path, WRITE )
			( function ifWritable( error, writable ){
				if( error ){
					error = new Error( "error checking file writability, " + error.message );

					catcher.cache.callback( error, false );

				}else if( writable ){
					fs.writeFile( path, content,
						function onWrite( error, result ){
							if( error ){
								error = new Error( "error writing to file, " + error.message );

								catcher.cache.callback( error, false );

							}else{
								catcher.cache.callback( null, true );
							}
						} );

				}else{
					catcher.cache.callback( null, false );
				}
			} );

		return catcher;
	}
};

module.exports = scrivi;
