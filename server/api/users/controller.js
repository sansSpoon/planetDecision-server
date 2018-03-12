'use strict';

/*
** TODO: Add try catch to everything?
** TODO: Need to determine how to seperate
**   controller specific, or model specific functions
** TODO: Update one record @ server - needs to have better promise handling
**
*/


// libraries
const pluralize = require('pluralize');

// loaders
const Model = require('./model.js');

// utilities
const routePath = pluralize.singular(/[^/]*$/.exec(__dirname)[0]);


// ! Get requested ID as parameter and attach to Koa context
/*
** @param id
** @param ctx
** @return {next}
*/
//
exports.params = async function getParams(id, ctx, next) {

	ctx[routePath] = await Model.findById(id);

	if (!ctx[routePath]) {

		return (ctx.status = 404);
	}
	return next();
};


// ! Create new record
/*
** @param ctx
** @return {Promise}
**
** @example curl -i -XPOST '<host>:<port>/users' -d '{"firstName":"John", "lastName":"Doe"}' -H 'Content-Type: application/json'
*/
//
exports.createOne = async function createOne(ctx, next) {

	ctx.body = await Model.create(ctx.request.body).then((result) => result);
	ctx.status = 201;
	await next();
};


// ! Read one record
/*
** @param id
** @return {Promise}
**
** @example curl -i "<host>:<port>/users/1"
*/
//
exports.readOne = async function readOne(ctx, next) {

	ctx.body = ctx[routePath];
	await next();
};


// ! Read all records
/*
** @return {Promise}
**
** @example curl -i "<host>:<port>/users"
*/
//
exports.readAll = async function readAll(ctx, next) {

	ctx.body = await Model.find();
	await next();
};


// ! Update one record @ client
/*
** @param ctx.body
** @return {Promise}
**
** @example curl -i -XPUT "<host>:<port>/users/1" -d '{"firstName":"Zoe", "lastName":"Zulu"}' -H 'Content-Type: application/json'
*/
//
exports.updateOne = async function updateOne(ctx, next) {

	Object.assign(ctx[routePath], ctx.request.body);

	ctx[routePath].save((err, result) => {

		if (err) {
			next(err);
		} else {
			ctx.body = result;
		}
	});

	await next();
};


// ! Update one record @ server (not attached to router, example only)
/*
** @param ctx.body
** @return {Promise}
**
** @example curl -i -XPUT "<host>:<port>/users/1" -d '{"firstName":"Zoe", "lastName":"Zulu"}' -H 'Content-Type: application/json'
*/
//
exports.updateOnServer = async function updateOnServer(ctx, next) {

	Model.updateOne({
		_id: ctx.params.id,
	}, {
		field1: ctx.request.body.field1,
		$push: { field2: ctx.request.body.field2 },
	}).exec();

	await next();
};


// ! Delete one record
/*
** @param id
** @return {Promise}
**
** @example curl -i -XDELETE "<host>:<port>/users/<id>"
*/
//
exports.deleteOne = async function deleteOne(ctx, next) {

	await Model.deleteOne({
		_id: ctx.params.id,
	});
	ctx.status = 204;

	await next();
};
