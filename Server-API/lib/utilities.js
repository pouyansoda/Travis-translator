var colors = require( 'colors' );

function getTimestamp( d ) {
	return ( d || new Date() ).toISOString().replace( 'T', ' ' ).replace( 'Z', '' );
	// return ( d || new Date() ).toISOString().replace( /[ZT]/g, ' ' );
}

function requestLogger( req, res, next ) {
	console.log( getTimestamp(), req.method.green, req.url );
	next();
}

module.exports = {
	getTimestamp: getTimestamp,
	requestLogger: requestLogger
};
