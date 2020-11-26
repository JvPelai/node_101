const FornecedorDao = require('../rotas/fornecedores/FornecedorDao')

FornecedorDao
    .sync()
    .then(() => console.log('Tabela de fornecedorescriada com sucesso'))
    .catch(console.log)