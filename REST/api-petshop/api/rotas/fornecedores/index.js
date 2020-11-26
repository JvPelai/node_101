const roteador = require('express').Router()
const Tabela = require('./TabelaFornecedor')

roteador.use('/', async (req,res) => {
    const resultados = await Tabela.listar()
    res.send(JSON.stringify(resultados))
})

module.exports = roteador;