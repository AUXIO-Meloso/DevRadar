const axios = require('axios');        // Biblioteca que chama API´s de outros lugares (informações de usuários, jogos, etc).
const Dev = require('../models/Dev');   // Importando o aquivo de criação dos devs.
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find(); // Listando todos os devs

        return response.json(devs);
    },

    // async representa que a função pode demorar a responder e await para não executar o resto do código até obter uma resposta.
    async store(request, response) {

        // https://stackoverflow.com/questions/35415978/syntax-const-variablename-can-anyone-explain-or-point-me-into-the-right-d/35416079
        // Link para explicar essa sintaxe de atribuição abaixo.
    
        // Passando os dados do usuário para as duas constantes (github_username e techs respectivamente)
        const { github_username, techs, latitude, longitude } = request.body; 
    
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            // Puxando dados do github através do link (Link completado com a const digitada acima)
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); 
                
            // Utilizado 'let' pois a variável 'name' pode ser alterada.
            // Puxando apenas os dados escolhidos da api.
            let { name, avatar_url, bio} = apiResponse.data;

            // Em caso de erro, renomeando o 'name' pelo próprio login do github.
            if (!name) {
                name = apiResponse.data.login;
            };

            // Separando as tecnologias digitadas pelo usuário.
            // .split separa o vetor pelo caracter ','  |  .map percorre o vetor  |  .trim remove os espaços.
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            // O método create envia os dados recolhidos para o servidor
            // Sintaxe utilizada é semelhante ao de atribuição
            // EX: "github_username," == "github_username = github_username". São constantes diferentes com o mesmo nome.
            dev = await Dev.create({
                github_username,
                bio,
                avatar_url,
                name,
                techs: techsArray,
                location,
            });

        }

     

        // Retornando o objeto criado como resposta.
        return response.json(dev);
    },

    async destroy(request, response) {
        const { github_username } = request.body; 
       const devDestroy = await Dev.findOneAndDelete( {github_username} ); 
        return response.json(devDestroy);
    }

};