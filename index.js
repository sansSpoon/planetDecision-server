'use strict';

// TODO: describe the app
// TODO: built using node 9.5.0
// TODO: version info, etc

const env = require('./server/config/env');
const app = require('./server/server');

app.listen(env.port);
console.log(`Server running on port ${env.port}`);
