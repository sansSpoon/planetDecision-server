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
** @param uri - the configuration object use to modify the default connection
** @return {mongoose.connection}
*/
//
exports.init = async function dbInit(app, uri) {

	// Set the default url, modify the connection string in "server/config/env"
	const dbURL = new URL('mongodb://127.0.0.1/koacola');

	dbURL.protocol = 'mongodb://';
	dbURL.hostname = uri.host;
	dbURL.port = uri.port;
	dbURL.pathname = uri.data;
	dbURL.username = uri.user;
	dbURL.password = uri.pass;

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
