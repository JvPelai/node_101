const db = require('../infra/database/connection')
const uploadDeArquivo = require('../infra/arquivos/uploadArquivos')


class Pet {
    adiciona(pet,res){
        const query = 'INSERT INTO Pets SET ?'

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) =>{

            if(erro){
                res.status(400).json({erro})
            }else{

                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                
                db.query(query, novoPet, erro => {
                    if(erro){
                        console.log(erro)
                        res.status(400).json(erro)
                    }else{
                        res.status(200).json(pet)
                    }
                })
            }
        })

        
    }
}

module.exports = new Pet();