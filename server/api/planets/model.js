'use strict';

// libraries
const mongoose = require('mongoose');
const pluralize = require('pluralize');

// utilities
const routePath = pluralize.singular(/[^/]*$/.exec(__dirname)[0]);

// schema
const Schema = mongoose.Schema; // eslint-disable-line

const satelliteSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	radiusKM: {
		type: Number,
		required: true,
	},
	rotationVelocityKMH: {
		type: Number,
		required: true,
	},
	apoapsisAU: {
		type: Number,
		required: true,
	},
	periapsisAU: {
		type: Number,
		required: true,
	},
	orbitVelocityKMS: {
		type: Number,
		required: true,
	},
}, { strict: 'throw' });

const routeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	radiusKM: {
		type: Number,
		required: true,
	},
	rotationVelocityKMH: {
		type: Number,
		required: true,
	},
	aphelionAU: {
		type: Number,
		required: true,
	},
	perihelionAU: {
		type: Number,
		required: true,
	},
	orbitVelocityKMS: {
		type: Number,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	colour: {
		type: String,
		required: true,
	},
	satellites: [satelliteSchema],
}, { strict: 'throw' });

module.exports = mongoose.model(routePath, routeSchema);
