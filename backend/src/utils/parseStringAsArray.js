module.exports = function stringAsArray(dado) {
    return dado.split(',').map(dado => dado.trim());
}