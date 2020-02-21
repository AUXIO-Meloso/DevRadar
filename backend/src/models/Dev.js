// Nesse arquivo, será criado um modelo de entidade para exportação

const mongoose = require('mongoose'); // Qualquer biblioteca deve ser sempre importada no arquivo que usa seus métodos.
const PointSchema = require('./utils/PointSchema'); // Arquivo relacionado as coordenadas dos devs (Foi utilizado um arquivo separado para usos futuros).

// Criando uma entidade (nesse caso, um developer) através da método Schema. Método derivado do mongoose.
// Esse método permite criar um objeto que consiga ser incluído no banco de dados de forma "organizada"

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

// Module.exports significa poder exportar para outro documento js, nesse caso, usaremos apenas o dev criado.
module.exports = mongoose.model('Dev', DevSchema);