const http = require('http');
const requestHandler = require('./routes');
//Returns a new instance of Server.
const server = http.createServer(requestHandler);

server.listen(3000);
