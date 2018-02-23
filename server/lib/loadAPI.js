'use strict';


// ! API Loader
/*
** Checks for correctly configured directories (routes) in the API root
**
** @param app - the Koa application
** @param root - the API root directory
** @return {app}
*/
//
module.exports = function(app, root){

	// libraries
	const { lstatSync, readdirSync, existsSync } = require('fs');
	const { resolve } = require('path');

	// utilities
	const isDirectory = (source) => lstatSync(source).isDirectory();
	const isFile = (source) => lstatSync(source).isFile();
	const getDirectories = (source) => readdirSync(source).map(name => resolve(source, name));

	try {	
		let apiRoutes = getDirectories(root);

		if (apiRoutes.filter(isFile).length > 0) {
			console.warn('API only reads directories, ignoring files.');
		}

		apiRoutes = apiRoutes.filter(isDirectory);

		if (apiRoutes.length === 0) {
			throw new Error('API root must contain properly configured directories');
		}

		let configs = 0;
		for (let route of apiRoutes) {
			if (! existsSync(route + '/router.js')) {
				console.error(`${route} missing router`);
				configs++;
			}
			if (! existsSync(route + '/controller.js')) {
				console.error(`${route} missing controller`);
				configs++;
			}
			if (! existsSync(route + '/model.js')) {
				console.error(`${route} missing model`);
				configs++;
			}
		}
		if (configs > 0) {
			throw new Error(`${configs} errors with the API configuration.`);
		}

		for (let route of apiRoutes) {
			let routePath = /[^/]*$/.exec(route)[0];
			routePath = require('../api/' + routePath + '/router');
			app.use(routePath.routes());
			app.use(routePath.allowedMethods());
		}

	return app;

	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
		process.exit();
	}
};