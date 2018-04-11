'use strict';

// libraries
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');

// utilities
exports.signToken = function signToken(id) {
	return jwt.sign(
		{ _id: id },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRE },
	);
};

exports.decodeToken = function decodeToken() {
	return koaJwt({ secret: process.env.JWT_SECRET, key: 'token' });
};
