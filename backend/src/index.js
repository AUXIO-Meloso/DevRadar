// Métodos HTTP: GET, POST, DELETE, PUT

// Tipos de parâmetros:
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro)

// Banco de dados: MongoDB (Não-relacional)

const express = require('express');    // Gerencia requisições, rotas e url
const mongoose = require('mongoose');  // Esquemas para modelar os dados da aplicação (Conversão de tipos, validação e etc)
const routes = require('./routes');    // Arquivo .js separado para o controle das rotas (Tudo fora da pasta node_modules possui um caminho relativo).
const cors = require('cors');

const app = express(); // Criando a aplicação.

// Utilizando o mongoose para se conectar com o banco de dados. (Além de gerenciar os dados, ele facilita a conexão com o banco de dados)
mongoose.connect('mongodb+srv://<user>:<password>@cluster0-pkcn4.mongodb.net/AUXIO?retryWrites=true&w=majority', {

    // Remoção de avisos (No terminal) do mongoose em relação a url e conexão com a rede.
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
mongoose.set('useCreateIndex', true); // Remoção de avisos irritantes.

// .use significa usar qualquer método http e também serve para criar middlewares.
// https://expressjs.com/pt-br/guide/writing-middleware.html Link para entender as funções de rotas e middlewares.

// BANCO DE DADOS <--(Express)--> JSON <---> REACT/REACT_NATIVE

app.use(cors());
app.use(express.json()); // Relacionando o express com o formato Json
app.use(routes);         // Relacionando o express com o arquivo routes

app.listen(3333); // Definindo uma porta para acesso ao servidor local