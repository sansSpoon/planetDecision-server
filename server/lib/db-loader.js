'use strict';

// libraries
const mongoose = require('mongoose');
const { URL } = require('url');

// loaders
const logger = require('./console-wrapper.js');

// ! DB Loader
/*
** Uses a relevant config file to create a connection to mongoose.
** Notifies the App once a successful connection is established.
**
** @param app - the Koa application
** @param env - the configuration object used to modify the default connection
** @return {mongoose.connection}
*/
//
exports.init = async function dbInit(app, env) {

	// Set the default url, modify the connection string in ".env"
	const dbURL = new URL('mongodb://127.0.0.1/koacola');

	dbURL.protocol = 'mongodb://';
	dbURL.hostname = env.DB_HOST;
	dbURL.port = env.DB_PORT;
	dbURL.pathname = env.DB_DATA;
	dbURL.username = env.DB_USER;
	dbURL.password = env.DB_PASS;

	mongoose.connection.on('connected', () => {
		logger.info('Connected to DB!');
		app.emit('ready');
	});

	mongoose.connection.on('error', (err) => {
		logger.error('A DB error occured.', err.message);
	});

	mongoose.connection.on('disconnected', () => {
		logger.info('DB disconnected!');
	});

	const gracefulExit = function gracefulExit() {
		mongoose.connection.close(() => {
			logger.info('DB connection closed at the request of App.');
			process.exit(0);
		});
	};

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

	try {
		logger.info('Attempting DB connection...');
		return await mongoose.connect(dbURL.toString());
	} catch (err) {
		logger.error('Sever initialization failed: ', err.message);
		process.exit(1);
	}
};
