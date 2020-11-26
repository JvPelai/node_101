const Modelo = require('./FornecedorDao')

module.exports = {
    listar(){
        return Modelo.findAll()
    }
}