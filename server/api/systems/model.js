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
const Schema = mongoose.Schema; // eslint-disable-line


const hierarchySchema = new Schema({
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

module.exports = mongoose.model(System, systemSchema);
