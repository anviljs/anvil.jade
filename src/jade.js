var jade;

module.exports = function( _, anvil ) {
	anvil.plugin( {
		name: "anvil.jade",
		configure: function( config, command, done ) {
			anvil.addRenderEngine( ".jade", this, "text/html" );

			anvil.config[ "anvil.combiner" ].patterns.push( {
				extensions: [ ".jade" ],
				find: "/import.?'.*'.?/g",
				replace: "/([ \t]*)import.?'replace'.?/g"
			} );
			done();
		},

		render: function( file, content, context, done, options ) {
			if( !jade ) {
				jade = require( "jade" );
			}
			try {
				var opts = _.extend( { pretty: true, filename: file }, options ),
					compile = jade.compile( content, opts );
				done( compile( context ) );
			} catch ( error ) {
				anvil.stopBuild( error );
				done( "", error );
			}
		},

		rename: function( name ) {
			return name.replace( ".jade", ".html" );
		}
	} );
};