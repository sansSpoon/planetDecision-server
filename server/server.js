'use strict';

// TODO: Add debugging logger ? Morgan

// libraries
const Koa = require('koa');
const loadApi = require('./lib/loadApi');

// loaders
const app = new Koa();
loadApi(app, __dirname + '/api');


// export the app
module.exports = app;