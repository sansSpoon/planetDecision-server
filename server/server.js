'use strict';

// TODO: Add debugging logger ? Morgan

// libraries
const Koa = require('koa');
const api = require('./lib/api-loader');
const { resolve } = require('path');

// loaders
const app = new Koa();
api.init(app, resolve(__dirname, 'api'));


// export the app
module.exports = app;
