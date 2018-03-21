'use strict';

module.exports = {
	port: process.env.PORT || 3000,
	db: {
		data: 'koacola-dev',
		host: 'localhost',
		port: '27017',
		user: '',
		pass:	'',
	},
	logging: true,
	jwtExpire: '5m',
	secrets: {
		jwt: process.env.JWT || 'shhhh', // remove default secret before commiting or in production
	},
};
