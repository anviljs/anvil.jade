/*
	anvil.jade - Jade compiler extension for anvil.js
	version:	0.1.0
	author:		Alex Robson <alex@sharplearningcurve.com> (http://sharplearningcurve.com)
	copyright:	2011 - 2012
	license:	Dual licensed
				MIT (http://www.opensource.org/licenses/mit-license)
				GPL (http://www.opensource.org/licenses/gpl-license)
*/
var jade;

module.exports = function( _, anvil ) {
	anvil.plugin( {
		name: "anvil.jade",
		
		configure: function( config, command, done ) {
			anvil.addCompiler( ".jade", this );

			anvil.config[ "anvil.combiner" ].patterns.push( {
				extensions: [ ".jade" ],
				find: "/import.?'.*'.?/g",
				replace: "/([ \t]*)import.?'replace'.?/g"
			} );
			done();
		},

		compile: function( content, done ) {
			if( !jade ) {
				jade = require( "jade" );
			}
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