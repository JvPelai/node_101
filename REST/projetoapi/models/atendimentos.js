const moment = require('moment');
const db = require('../infra/connection');

class Atendimentos {
    adiciona(atendimento,res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 4

        

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo =>  !campo.valido)
        const existemErros = erros.length
        
        

        if(existemErros){
            res.status(400).json(erros)
        }else{
            
            const atendimentoDatado = {...atendimento,data, dataCriacao};

            const sql = 'INSERT INTO Atendimentos SET ?';
            
            db.query(sql, atendimentoDatado, (erro,resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';

        db.query(sql,(erro,resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id,res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        db.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados[0])
            }
        })
    }

    altera(id,valores,res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        db.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores,id})
            }
        })
    }

    deleta(id,res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        db.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimentos