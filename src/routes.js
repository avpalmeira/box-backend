const express = require('express');
const multer = require('multer');

const multerConfig = require('./config/multerConfig');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

const routes = express.Router();

routes.post(
  '/boxes',
  BoxController.store
);

routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
);

routes.get(
  '/boxes/:id',
  BoxController.show
);

module.exports = routes;
