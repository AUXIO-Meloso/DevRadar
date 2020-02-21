const { Router } = require('express'); // Importando apenas o "Router" do express (Controle de rotas).
const DevController = require('./controllers/DevController');  // Importando arquivo de controle de developers (Funções de listagem, cadastro, etc).
const SearchController = require('./controllers/SearchController'); // Importando arquivo de procura de developers (Funções de pesquisa individual);

// Criando uma constante de controle de rotas.
const routes = Router();

//  --> Definição de Rotas da aplicação <-- 

// Rota de listagem de devs
routes.get('/devs', DevController.index);

// Rota de cadastro de devs
routes.post('/devs', DevController.store);

// Rota de procura de devs
routes.get('/search', SearchController.index);

// Rota de exclusão de devs
routes.delete('/devs', DevController.destroy);

//Exportando as rotas criadas para ser atribuida na index.js.
module.exports = routes;