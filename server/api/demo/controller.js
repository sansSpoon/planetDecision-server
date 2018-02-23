'use strict';

/*
** TODO: Add try catch to everything?
** TODO: Need to determine how to seperate
**   controller specific, or model specific functions
**
*/


// ! Create new record
/*
** @param name
** @return {Promise}
**
** @example curl -i -XPOST '<host>:<port>/users' -d '{"firstName":"Jacob", "lastName":"Jones"}' -H 'Content-Type: application/json'
*/
//
exports.createOne = async function createOne (ctx, next) {
	
	ctx.body = await addToDB(ctx.params.id, ctx.request.body);
	ctx.status = 201;
	await next();
}


// ! Read one record from ID
/*
** @param id
** @return {Promise}
**
** @example curl -i "<host>:<port>/users/1"
*/
//
exports.readOne = async function readOne (ctx, next) {

	ctx.body = await getIdFromDb(ctx.params.id);
	await next();
}


// ! Read All records
/*
** @return {Promise}
**
** @example curl -i "<host>:<port>/users"
*/
//
exports.readAll = async function readAll (ctx, next) {

	ctx.body = await getAllFromDb();
	await next();
}


// ! Update one records
/*
** @param id
** @param firstName
** @param lastName
** @return {Promise}
**
** @example curl -i -XPUT "<host>:<port>/users/<id>" -d '{"firstName":"Zoe", "lastName":"Zulu"}' -H 'Content-Type: application/json'
*/
//
exports.updateOne = async function updateOne (ctx, next) {

	ctx.body = await updateIdToDb(ctx.params.id, ctx.request.body);
	await next();
}


// ! Delete one records
/*
** @param id
** @return {Promise}
**
** @example curl -i -XDELETE "<host>:<port>/users/<id>"
*/
//
exports.deleteOne = async function deleteOne (ctx, next) {
	
	await removeIdInDb(ctx.params.id);
	ctx.status = 204;
	await next();
}