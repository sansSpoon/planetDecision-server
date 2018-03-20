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
const controller = require('./controller');

// utilities
const routePath = /[^/]*$/.exec(__dirname)[0];

const router = new Router({
	prefix: `/${routePath}`,
});

// CRUD configuration
router
	.post('/signup', koaBody(), controller.newUser)
	.post('/signin', koaBody(), constroller.getUser);

module.exports = router;
