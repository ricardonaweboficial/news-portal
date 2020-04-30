const { Router } = require('express');
const routes = Router();

const NewsController = require('./controllers/NewsController');

routes.get('/', NewsController.index);

module.exports = routes;