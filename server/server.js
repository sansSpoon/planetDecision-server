'use strict';

// TODO: Add debugging logger ? Morgan

// libraries
const Koa = require('koa');
const loadApi = require('./lib/loadApi');
const { resolve } = require('path');

// loaders
const app = new Koa();
loadApi(app, resolve(__dirname, 'api'));


// export the app
module.exports = app;
