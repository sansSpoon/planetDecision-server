'use strict';

// libraries
const mongoose = require('mongoose');
const pluralize = require('pluralize');

// utilities
const routePath = pluralize.singular(/[^/]*$/.exec(__dirname)[0]);

// schema
const Schema = mongoose.Schema; // eslint-disable-line
const routeSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
}, { strict: 'throw' });

module.exports = mongoose.model(routePath, routeSchema);
