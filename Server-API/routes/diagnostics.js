var restify = require( 'restify' );

module.exports.routes = function( server ) {
	server.get( {
		path: '/diagnostics',
		name: 'Diagnostics'
	}, function respond( req, res, next ) {
		res.json( {
			host: HOST,
			port: PORT,
			version: VERSION
		} );
		return next();
	} );
};
