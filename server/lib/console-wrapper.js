'use strict';

/* eslint-disable prefer-rest-params, prefer-spread, no-console */

const logger = {};

// attach all the standard console methods
const consoleMethods = Object.keys(console);
consoleMethods.forEach((method) => {
	if (typeof console[method] === 'function') {
		logger[method] = console[method].bind(console);
	}
});

// override the log method to be conditional
logger.log = function log() {
	if (!process.env.LOGGING) return;
	console.log.apply(console, arguments);
};

// export it
module.exports = logger;

/* eslint-enable prefer-rest-params, prefer-spread, no-console */
