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
