'use strict';

// libraries
const Koa = require('koa');
const { resolve } = require('path');
const requestLogger = require('koa-logger');
const cors = require('@koa/cors');

// loaders
const env = require('./config/env');
const logger = require('./lib/console-wrapper.js');
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

	logger.info('Loading API routes...');
	api.init(app, resolve(__dirname, 'api'));

	app.listen(env.port, () => {

		logger.info(`Server running on port ${env.port} (${process.env.NODE_ENV})`);
	});
});

db.init(app, env.db);

// export the app
module.exports = app;
