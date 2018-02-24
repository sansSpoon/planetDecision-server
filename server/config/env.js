'use strict';

// provide a configurable environment

const config = {
	dev: 'development',
	test: 'testing',
	prod: 'production',
	port: process.env.PORT || 3000
};
 
// use the default node environment, else set 'development'
// This is already done by Koa, enforcing it here
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Add additional Environment Variables loaded from
// modules based on config name, if the module is missing
// or not an object, set it to an empty object
let additionalConfig;
try {
	additionalConfig = require('./' + process.env.NODE_ENV);
	
	if (typeof additionalConfig !== 'object') {
		throw new Error('Additional configuration was in an unknown format.');
	}

} catch(e) {
	console.log(e.message);
	additionalConfig = {};
}

// Merge the additionalConfig into the config and export it to the app
module.exports = Object.assign(config, additionalConfig);