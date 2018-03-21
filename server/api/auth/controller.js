'use strict';

// loaders
const User = require('../users/model');
const { signToken } = require('../../lib/jwt-auth');


// ! Create User
/*
** @param ctx
** @return {Promise}
**
** @example curl -i -XPOST '<host>:<port>/auth/signup' -d '{"email":"foo@foo.com", "password":"notARealPassword123!@#"}' -H 'Content-Type: application/json'
*/
//
exports.newUser = async function newUser(ctx, next) {

	const createUser = await User.create(ctx.request.body);
	ctx.state.authUser = createUser._id;
	ctx.state.token = signToken(ctx.state.authUser);
	ctx.status = 201;
	ctx.body = ctx.state;
	await next();
};


// ! Read User
/*
** @param id
** @return {Promise}
**
** @example curl -i -XPOST '<host>:<port>/auth/signin' -d '{"email":"foo@foo.com", "password":"notARealPassword123!@#"}' -H 'Content-Type: application/json'
*/
//
exports.getUser = async function getUser(ctx, next) {

	if (!ctx.request.body.email || !ctx.request.body.password) {
		ctx.status = 401;
		ctx.throw(401, 'Authentication Failed.');
	}

	const authUser = await User.findOne({ email: ctx.request.body.email });
	if (!authUser) {
		ctx.status = 401;
		ctx.throw(401, 'Authentication Failed.');
	}

	if (!await authUser.authenticate(ctx.request.body.password)) {
		ctx.status = 401;
		ctx.throw(401, 'Authentication Failed.');
	}

	ctx.state.authUser = authUser._id;
	ctx.state.token = signToken(ctx.state.authUser._id);
	ctx.status = 200;
	ctx.body = ctx.state;
	await next();
};
