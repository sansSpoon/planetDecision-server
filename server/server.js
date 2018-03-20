'use strict';

// libraries
const Koa = require('koa');
const { resolve } = require('path');
const requestLogger = require('koa-logger');
const cors = require('koa-cors');

// loaders
const env = require('./config/env');
const api = require('./lib/api-loader');
const db = require('./lib/db-loader');


const app = new Koa();

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		err.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
		ctx.app.emit('error', err, ctx);
	}
});

app.on('ready', () => {

	app.use(cors());
	app.use(requestLogger());

	console.log('Loading API routes...');
	api.init(app, resolve(__dirname, 'api'));

	app.listen(env.port, () => {

		console.log(`Server running on port ${env.port}`);
	});
});

db.init(app, env.db);

// export the app
module.exports = app;
