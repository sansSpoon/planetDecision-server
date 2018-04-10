'use strict';

// libraries
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');

// loaders
const env = require('./config');

// utilities
exports.signToken = function signToken(id) {
	return jwt.sign(
		{ _id: id },
		env.JWT_SECRET,
		{ expiresIn: env.JWT_EXPIRE },
	);
};

exports.decodeToken = function decodeToken() {
	return koaJwt({ secret: env.JWT_SECRET, key: 'token' });
};
