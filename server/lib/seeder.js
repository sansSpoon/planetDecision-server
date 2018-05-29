'use strict';

// ! Seeder
/*
** Creates a connection to MongoDB via mongoose.
** Populates the DB with valuse from data.json.
**
** NOTE: This is a standalone script which can optionally
**       be run manually before loading the API
*/
//


// libraries
const mongoose = require('mongoose');

// loaders
const System = require('../api/systems/model');
const Star = require('../api/stars/model');
const Planet = require('../api/planets/model');

// data
const data = require('./data');
const dbURL = new URL('mongodb://127.0.0.1:27017/planet-decision-dev');

// create DB connection
async function dbInit() {
	mongoose.connection.on('connected', () => {
		console.info('Connected to DB!');
	});
	
	mongoose.connection.on('error', (err) => {
		console.error('A DB error occured.', err.message);
	});
	
	mongoose.connection.on('disconnected', () => {
		console.info('DB disconnected!');
	});
	
	const gracefulExit = function gracefulExit() {
		mongoose.connection.close(() => {
			console.info('DB connection closed at the request of App.');
			process.exit(0);
		});
	};
	
	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
	
	try {
		console.info('Attempting DB connection...');
		return await mongoose.connect(dbURL.toString());
	} catch (err) {
		console.error('Sever initialization failed: ', err.message);
		process.exit(1);
	}
}

function seed(response) {
	
	const createDoc = function(model, doc) {
		return new model(doc).save()
			//.then((response) => response);
	}
	
	const uploadStars = function() {
		const stars = data.stars.map((star) => createDoc(Star, star));
		return Promise.all(stars)
		//	.then((response) => console.log(response));
	}
	
	const uploadPlanets = function() {
		const planets = data.planets.map((planet) => createDoc(Planet, planet));
		return Promise.all(planets)
		//	.then((response) => console.log(response));
	}
	uploadStars().then(console.log.bind(console))
	uploadPlanets().then((response) => console.log(response));
	//return;
}

dbInit()
	.then(seed)
//	.then(() => process.exit())


