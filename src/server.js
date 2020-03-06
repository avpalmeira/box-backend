const express = require('express');

const appConfig = require('./config/appConfig');
const dbConfig = require('./config/dbConfig');
const envConfig = require('./config/envConfig');
const socketConfig = require('./config/socketConfig');

function run() {

  // get port from defined variables
  const port = envConfig();

  // main application
  const app = express();

  // using websockets for real time support
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  appConfig(app, io);
  socketConfig(io);
  dbConfig();

  server.listen(port, () => {
    console.log(`API server running on port: ${port}`);
  });
}

run();