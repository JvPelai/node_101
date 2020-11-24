const moment = require('moment');
const db = require('../infra/connection');

class Atendimentos {
    adiciona(atendimento){
        const dataCriacao = new Date();
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = {...atendimento,data, dataCriacao};
        const sql = 'INSERT INTO Atendimentos SET ?';

        db.query(sql, atendimentoDatado, (erro,resultados) => {
            if(erro){
                console.log(erro)
            }else{
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimentos