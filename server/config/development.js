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
};
