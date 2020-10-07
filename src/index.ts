// Get dependencies
const http = require('http');
const path = require('path');
const myServer = require('../dist/server/server');

/**
 * Get port from environment and store in Express.
 */
let port = "";

if (process.env.NODE_ENV == 'test') {
  port = process.env.PORT || '3001';
}
else {
  port = process.env.PORT || '3000';
}

const app = myServer.Server.bootStrap().app;

app.set('port', port);

/**
 * Create HTTP server.
 */
const httpServer = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(port, () => console.log(`App Server running at port ${port}`));

module.exports = app;

