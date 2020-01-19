const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index); 
routes.post('/devs', DevController.store);
routes.get('/devs/:github_username', DevController.show);
// routes.put('/devs/:github_username', DevController.show);
routes.delete('/devs/:github_username', DevController.destroy);

routes.get('/devs/search', SearchController.index);

module.exports = routes;