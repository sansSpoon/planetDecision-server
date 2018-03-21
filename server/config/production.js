'use strict';

module.exports = {
	db: {
		data: 'koacola',
		host: 'localhost',
		port: '27017',
		user: '',
		pass:	'',
	},
	logging: false,
	jwtExpire: '1m',
	secrets: {
    jwt: process.env.JWT || 'shhhh', // remove default secret before commiting or in production
  },
};
