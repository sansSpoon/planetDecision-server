'use strict';

// libraries
const { resolve } = require('path');

// loaders
const logger = require('../lib/console-wrapper.js');

// provide a configurable environment
const config = {
	dev: 'development',
	test: 'testing',
	prod: 'production',
};

// use the default node environment, else set 'development'
// This is already done by Koa, enforcing it here
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Add additional Environment Variables loaded from modules based on config name
let additionalConfig;
try {
	additionalConfig = require(resolve(__dirname, process.env.NODE_ENV));

	if (typeof additionalConfig !== 'object') {
		throw new Error('Additional configuration was in an unknown format.');
	}

} catch (err) {
	logger.error(err.message);
	additionalConfig = {};
}

// Merge the additionalConfig into the config and export it to the app
module.exports = Object.assign(config, additionalConfig);
