const routes = require('express').Router();
const multer = require("multer");
const multerConfig = require('./config/multer');

const BaseController = require('./controllers/BaseController');

routes.get('/', BaseController.index);
routes.post('/', multer(multerConfig).single('file'), BaseController.post);
routes.delete('/:id', BaseController.delete);

module.exports = routes; 