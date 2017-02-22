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
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com:volkovasystems/scrivi.git",
			"test": "scrivi-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Replace content of existing file.
	@end-module-documentation

	@include:
		{
			"fs": "fs",
			"kept": "kept",
			"letgo": "letgo",
			"protype": "protype",
			"zelf": "zelf"
		}
	@end-include
*/

const falzy = require( "falzy" );
const fs = require( "fs" );
const kept = require( "kept" );
const letgo = require( "letgo" );
const protype = require( "protype" );
const zelf = require( "zelf" );

const scrivi = function scrivi( path, content, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"content:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( falzy( path ) || !protype( path, STRING ) ){
		throw new Error( "invalid path" );
	}

	if( falzy( content ) || !protype( content, STRING ) ){
		throw new Error( "invalid content" );
	}

	if( synchronous ){
		try{
			if( kept( path, WRITE, synchronous ) ){
				try{
					fs.writeFileSync( path, content );

					return true;

				}catch( error ){
					throw new Error( `error writing to file, ${ error.stack }` );
				}

			}else{
				return false;
			}

		}catch( error ){
			throw new Error( `cannot write file, ${ error.stack }` );
		}

	}else{
		let self = zelf( this );

		let catcher = letgo.bind( self )( function later( cache ){
			kept( path, WRITE )
				( function done( error, writable ){
					if( error ){
						error = new Error( `cannot write file, ${ error.stack }` );

						cache.callback( error, false );

					}else if( writable ){
						fs.writeFile( path, content,
							function done( error, result ){
								if( error ){
									error = new Error( `error writing to file, ${ error.stack }` );

									cache.callback( error, false );

								}else{
									cache.callback( null, true );
								}
							} );

					}else{
						cache.callback( null, false );
					}

					catcher.release( );
				} );
		} );

		return catcher;
	}
};

module.exports = scrivi;
