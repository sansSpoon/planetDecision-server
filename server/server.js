'use strict';

// TODO: Add debugging logger ? Morgan

// libraries
const Koa = require('koa');
const { resolve } = require('path');

// loaders
const env = require('./config/env');
const api = require('./lib/api-loader');
const db = require('./lib/db-loader');


const app = new Koa();

app.on('ready', () => {

	console.log('Loading API routes...');
	api.init(app, resolve(__dirname, 'api'));

	app.listen(env.port, () => {

		console.log(`Server running on port ${env.port}`);
	});
});

db.init(app, env.db);

// export the app
module.exports = app;
