const db = require('./connection')

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {

        db.query(query, parametros, (erros, resultados, campos) => {
            if(erros){
                reject(erros)
            }else{
                resolve(resultados)
            }
        })
    })
}

module.exports = executaQuery;