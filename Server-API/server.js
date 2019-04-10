// config
const config = require( './config/server' );
const database = require( './config/mongoose' );


// used modules
const fs = require('fs');
const restify = require( 'restify' );
const jwt = require( 'restify-jwt-community' );
const corsMiddleware = require('restify-cors-middleware')

const extensions = require( './lib/extensions.js' );
const util = require( './lib/utilities' );

var routeAuth = require( './lib/route-auth' );
var db = require( './models' );
// var noCache = require( './lib/nocache.js' );

const server = restify.createServer( config );

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Access-Control-Allow-Origin']
});



server.pre(cors.preflight);
server.use(cors.actual);


// Parses out the HTTP Date header (if present) and checks for clock skew
// (default allowed clock skew is 300s, like Kerberos). You can pass in a number,
// which is interpreted in seconds, to allow for clock skew.
server.use( restify.plugins.dateParser(300) );

// Parses the HTTP query string (i.e., /foo?id=bar&name=mark).
// If you use this, the parsed content will always be available in req.query,
// additionally params are merged into req.params. You can disable by passing in mapParams:
// false in the options object.
// server.use( restify.queryParser() );

// Supports checking the query string for callback or jsonp and ensuring that
// the content-type is appropriately set if JSONP params are in place.
// There is also a default application/javascript formatter to handle this.
// You should set the queryParser plugin to run before this, but if you don't
// this plugin will still parse the query string properly.
// server.use(restify.plugins.jsonp());

// If the client sends an accept-encoding: gzip header (or one with an appropriate q-val),
// then the server will automatically gzip all response data.
// Note that only gzip is supported, as this is most widely supported by clients in the wild.
server.use( restify.plugins.gzipResponse() );

// Blocks your chain on reading and parsing the HTTP request body.
// Switches on Content-Type and does the appropriate logic. application/json,
// application/x-www-form-urlencoded and multipart/form-data are currently supported.
server.use( restify.plugins.bodyParser({mapParams: true}) );

// Restify ships with a fairly comprehensive implementation of Token bucket,
// with the ability to throttle on IP (or x-forwarded-for) and username (from req.username).
// You define "global" request rate and burst rate, and you can define overrides for specific keys.
// Note that you can always place this on per-URL routes to enable different request rates
// to different resources (if for example, one route, like /my/slow/database is much easier
// to overwhelm than /my/fast/memcache).
server.use(restify.plugins.throttle({
	burst: 50,
	rate: 0.5,
	ip: true
}));

// You can use this handler to let clients do nice HTTP semantics with the "match" headers.
// Specifically, with this plugin in place, you would set res.etag=$yourhashhere,
// and then this plugin will do one of: return 304 (Not Modified) [and stop the handler chain],
// return 412 (Precondition Failed) [and stop the handler chain],
// Allow the request to go through the handler chain.
// server.use(restify.conditionalRequest());

// sets up all of the default headers for the system
server.use( restify.plugins.fullResponse() );

// remaps the body content of a request to the req.params variable,
// allowing both GET and POST/PUT routes to use the same interface
// server.use(restify.bodyParser());

// server.use( restify.urlEncodedBodyParser() );

server.use( util.requestLogger );

// When a client request is sent for a URL that does not exist, restify will emit this event.
// Note that restify checks for listeners on this event,
// and if there are none, responds with a default 404 handler.
// It is expected that if you listen for this event, you respond to the client.
// server.on('NotFound', function (request, response, cb) {});

// When a client request is sent for a URL that does exist, but you have not
// registered a route for that HTTP verb, restify will emit this event.
// Note that restify checks for listeners on this event, and if there are none,
// responds with a default 405 handler. It is expected that if you listen for this event,
// you respond to the client.
// server.on('MethodNotAllowed', function (request, response, cb) {});

// When a client request is sent for a route that exists, but does not match the version(s)
//  on those routes, restify will emit this event. Note that restify checks for listeners
// on this event, and if there are none, responds with a default 400 handler.
// It is expected that if you listen for this event, you respond to the client.
// server.on('VersionNotAllowed', function(request, response, cb) {});

// When a client request is sent for a route that exist, but has a content-type mismatch,
// restify will emit this event. Note that restify checks for listeners on this event,
// and if there are none, responds with a default 415 handler.
// It is expected that if you listen for this event, you respond to the client.
// server.on('UnsupportedMediaType', function (request, response, cb) {});

// Emitted after a route has finished all the handlers you registered.
// You can use this to write audit logs, etc. The route parameter will be the Route object that ran.
// server.on('after', function (request, response, route, error) {});

// Emitted when some handler throws an uncaughtException somewhere in the chain.
// The default behavior is to just call res.send(error), and let the built-ins in restify
// handle transforming, but you can override to whatever you want here.
// server.on('uncaughtException', function (request, response, route, error) {});

// mount the db
server.use( function( req, res, next ) {
	req.db = db;
	return next();
} );

// disable cache
// server.use( noCache().unless( {
// 	path: config.cachedRoutes
// } ) );

server.use( jwt( {
	secret: config.secret,
	isRevoked: function( req, payload, done ) {
		console.log( 'JWT'.green, payload );

		req.authorization = payload;
		return done(null, false);

		// var id = payload.id;

		// req.db.User.findById( id ).then( function( user ) {
		// 	req.authorization = user;
		// 	// set req.username so we can use it for throttling
		// 	if (user) {
		// 		req.username = user.email
		// 	}
		// 	return done( null, false );
		// }, function( err ) {
		// 	return done( err, true );
		// } );
	}
} ).unless( {
	path: config.openRoutes
} ) );

server.use( routeAuth );

fs.readdirSync( './routes' ).forEach( function( curFile ) {
	if ( curFile.substr( -3 ) === '.js' ) {
		route = require( './routes/' + curFile );
		route.routes( server );
	}
} );

// store static files on the file system for caching purposes
// server.get( /\/assets\/?.*/, restify.serveStatic( {
// 	directory: __dirname + '/assets/'
// 	// default: 'index.json'
// } ) );

server.listen( config.port, config.host, function() {
	console.info( util.getTimestamp(), server.name.blue, server.url );
} );
