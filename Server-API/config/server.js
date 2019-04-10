'use strict';
var env = process.env.NODE_ENV || 'development';

function build_uri( path ) {
	return [
		'http://',
		process.env.HOST || '127.0.0.1',
		':',
		process.env.PORT || 8080,
		path || ''
	].join( '' );
}

var config = {
	// certificate: null, // HTTPS PEM-encoded certificate
	// key: null, // HTTPS PEM-encoded key
	name: 'travis-foundation-api',
	version: ['1.0.0'],
	host: '127.0.0.1',
	port: 8080,
	secret: 'ouwcgBcS!Pxy',
	jwt: {
		algorithm: 'HS256',
		expiresIn: '1h',
		notBefore: '-1m',
		// audience: 'audience',
		issuer: 'http://travis.foundation',
		jwtid: 'travis-foundation-translation-api',
		subject: 'hello@travis.foundation'
	},
	openRoutes: [
		'/ping',
		'/token'
	],
	buildUri: build_uri
};

switch ( env ) {
	case 'test':
		// config = Object.assign( config, {} );
		break;
	case 'production':
		// config = Object.assign( config, {} );
		break;
}

module.exports = config;
