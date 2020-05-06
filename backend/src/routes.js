const { Router } = require('express');
const routes = Router();

const NewsController = require('./controllers/NewsController');
const EverythingController = require('./controllers/EverythingController');


// Top News 
routes.get('/topHeadlines', NewsController.index);
routes.post('/topSourceNews', NewsController.show);

// Everything News
routes.post('/everything/:query', EverythingController.index);


module.exports = routes;