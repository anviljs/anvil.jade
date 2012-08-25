/*
	anvil.coffee - Jade compiler plugin for anvil.js
	version: 0.0.1
	author: Alex Robson <alex@sharplearningcurve.com> (http://sharplearningcurve.com)
	copyright: 2012
	license: Dual licensed 
			 MIT (http://www.opensource.org/licenses/mit-license)
			 GPL (http://www.opensource.org/licenses/gpl-license)
*/
var jade = require( "jade" );

var jadeCompilerFactory = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.jade",
		
		configure: function( config, command, done ) {
			anvil.addCompiler( ".jade", this );
			done();
		},

		compile: function( content, done ) {
			try {
				var compile = jade.compile( content, {
					pretty: true
				} );
				done( compile({}) );
			} catch ( error ) {
				done( "", error );
			}
		},

		rename: function( name ) {
			return name.replace( ".jade", ".html" );
		}
	} );
};

module.exports = jadeCompilerFactory;