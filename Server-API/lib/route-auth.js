const config = require( '../config/server' );
const restify = require( 'restify' );
const errors = require( 'restify-errors' );

module.exports = function( req, res, next )
{
	var payload = req.authorization;

	if (payload)
	{
		req.username = payload.id;
	}

	// Accept all open routes
	if ( config.openRoutes.matchInArray( req.getPath() ) )
	{
		return next();
	}

	// accept all api-client roles
	if ( payload.role == 'api-client' )
	{
		return next();
	}

	return next( new errors.NotAuthorizedError("Authorization failed") );
};
