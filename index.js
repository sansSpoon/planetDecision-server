// to-do
// describe the app
// built using node 9.5.0

const config = require('./server/config/config');
const app = require('./server/server');

app.listen(config.port);