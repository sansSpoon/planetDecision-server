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

// utilities
const routePath = /[^/]*$/.exec(__dirname)[0];

const router = new Router({
	prefix: '/' + routePath
});

// CRUD configuration
router
	.get('/', async (ctx, next) => {console.log('readAll'); await next();})
	.get('/:id', async (ctx, next) => {console.log('readOne'); await next();})
	.post('/', koaBody(), async (ctx, next) => {console.log('createOne'); await next();})
	.put('/:id', koaBody(), async (ctx, next) => {console.log('updateOne'); await next();})
	.delete('/:id', async (ctx, next) => {console.log('deleteOne'); await next();});

module.exports = router;