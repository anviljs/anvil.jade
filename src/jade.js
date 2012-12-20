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