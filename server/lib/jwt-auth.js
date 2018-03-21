'use strict';

// libraries
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');

// loaders
const config = require('../config/env');

// utilities
exports.signToken = function signToken(id) {
	return jwt.sign(
		{ _id: id },
		config.secrets.jwt,
		{ expiresIn: config.jwtExpire },
	);
}

exports.decodeToken = function decodeToken() {
	return koaJwt({secret: config.secrets.jwt, key: 'token'});
}
