const express = require('express');

const appConfig = require('./config/appConfig');
const dbConfig = require('./config/dbConfig');
const socketConfig = require('./config/socketConfig');

function run() {

  const defaultPort = 3333;

  // main application
  const app = express();

  // using websockets for real time support
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  
  appConfig(app, io);
  socketConfig(io);
  dbConfig();

  server.listen(process.env.PORT || defaultPort);
}

run();