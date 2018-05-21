'use strict';

// ! systems model
/*
** Each system contains sub-documents for hierarchies.
** Hierarchies consist of a single star and it's orbiting planets.
** Hierarchies ref stars and planets.
*/
//

// libraries
const mongoose = require('mongoose');
const pluralize = require('pluralize');

// utilities
const routePath = pluralize.singular(/[^/]*$/.exec(__dirname)[0]);

// schema
const Schema = mongoose.Schema; // eslint-disable-line
const hierarchySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	star: {
		type: Schema.Types.ObjectId,
		ref: 'star',
	},
	planets: [{
		type: Schema.Types.ObjectId,
		ref:'planet'
	}],
},{ strict: 'throw' });

const systemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	hierarchies: [hierarchySchema],
}, { strict: 'throw' });

module.exports = mongoose.model(routePath, systemSchema);
