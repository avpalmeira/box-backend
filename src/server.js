const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const defaultPort = 3333;

// main application
const app = express();

// using websockets for real time support
const server = require('http').Server(app);
const io = require('socket.io')(server);

// let users be isolated in their own room
io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

// connecting to database
const connectionString = [
  'mongodb+srv://<login>:<pass>',
  '@experiments-cluster-gppow.mongodb.net/test?retryWrites=true',
].join('');
mongoose.connect(connectionString, { useNewUrlParser: true });

// allow the application to be accessed by any client
app.use(cors());

// let the socket object be accessed throughout the application
app.use((req, res, next) => {
  req.io = io;

  return next();
});

// allow json messages
app.use(express.json());

// allow file uploads
app.use(express.urlencoded({ extended: true }));

// will handle the routes
app.use(require('./routes'));

// let stored files be accessed by URL
const tmpFolder = path.resolve(__dirname, '..', 'tmp');
app.use('/files', express.static(tmpFolder));

server.listen(process.env.PORT || defaultPort);
