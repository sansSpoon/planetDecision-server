'use strict';

// libraries
const { existsSync } = require('fs');
const { resolve } = require('path');

// Required environment keys
const envs = [
	'NODE_ENV', 'PORT', 'DB_DATA', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'LOGGING', 'JWT_SECRET', 'JWT_EXPIRE',
];

// Load in .env keys if present
if (existsSync(resolve(process.cwd(), '.env'))) {
	const dotenv = require('dotenv').config();
	if (dotenv.error) {
		throw dotenv.error;
	}
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Check the required keys have been loaded
// into 'process.env' by any means
const foundKeys = Object.keys(process.env).filter(function filterkeys(key) {
	return this.indexOf(key) >= 0;
}, envs);

// Make sure the correct amount of keys are loaded
if (foundKeys.length !== envs.length) {
	throw new Error('Required environment keys are missing.');
}
