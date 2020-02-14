const express = require('express');
const path = require('path');
const cors = require('cors');

// configure app
const appConfig = (app, io) => {

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
  
    // handle the routes
    app.use(require('../routes'));
  
    // let stored files be accessed by URL
    const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
    app.use('/file', express.static(tmpFolder));
}

module.exports = appConfig;