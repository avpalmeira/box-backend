const express = require('express');
const multer = require('multer');

const multerConfig = require('./config/multerConfig');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

const routes = express.Router();

routes.post(
  '/box',
  BoxController.store
);

routes.post(
  '/box/:id/file',
  multer(multerConfig).single('file'),
  FileController.store
);

routes.get(
  '/box/:id',
  BoxController.show
);

module.exports = routes;
