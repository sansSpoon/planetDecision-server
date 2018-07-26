'use strict';

// ! Router
/*
** Uses this file's containing directory as the API path
** adds CRUD routes to path
**
** @return {router}
*/
//

// libraries
const Router = require('koa-router');
const koaBody = require('koa-body');

// loaders
const controller = require('./controller');
const { decodeToken } = require('../../lib/jwt-auth');

// utilities
const routePath = /[^/]*$/.exec(__dirname)[0];

const router = new Router({
	prefix: `/${routePath}`,
});

// CRUD configuration
router
	.param('id', controller.params)
	.get('/', controller.readAll)
	.get('/:id', controller.readOne)
	.post('/', decodeToken(), koaBody(), controller.createOne)
	.put('/:id', decodeToken(), koaBody(), controller.updateOne)
	.delete('/:id', decodeToken(), controller.deleteOne);

module.exports = router;
