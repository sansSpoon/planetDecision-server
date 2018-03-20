'use strict';

// libraries
const mongoose = require('mongoose');
const pluralize = require('pluralize');

// utilities
const routePath = pluralize.singular(/[^/]*$/.exec(__dirname)[0]);

// schema
const Schema = mongoose.Schema; // eslint-disable-line
const routeSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
}, { strict: 'throw' });

// validation
routeSchema.path('email').validate((email) => {
	return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
}, 'A valid email address is required.');

routeSchema.path('password').validate((password) => {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* ).{8,}$/.test(password);
}, 'Password must be greater than 7 characters, upper and lower case with digits and special characters.');

// pre-save
routeSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.hashPassword(this.password)
		.then((password) => {
			this.password = password;
			next();
		});
});

// methods
routeSchema.methods = {
	hashPassword(password) {
		return bcrypt.hash(password, 10);
	},
	authenticate(password) {
		return bcrypt.compare(password, this.password);
	},
}

module.exports = mongoose.model(routePath, routeSchema);
