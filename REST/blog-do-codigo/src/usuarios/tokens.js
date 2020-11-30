const jwt = require('jsonwebtoken');
const whitelistRefreshToken = require('../../redis/whitelist-refresh-token');
const crypto = require('crypto');
const moment = require('moment');
const blacklistAccessToken = require('../../redis/manipula-blacklist');
const {InvalidArgumentError} = require('../erros')

function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]){
    const payload = {id};
  
    const token = jwt.sign(payload, process.env.CHAVE_JWT, 
        { expiresIn: tempoQuantidade + tempoUnidade});
    return token;
  }

  async function verificaTokenJWT(token,nome, blacklist){
    await verificaTokenNaBlacklist(token,nome, blacklist);
    const {id} = jwt.verify(token, process.env.CHAVE_JWT);
    return id
  }

  async function verificaTokenNaBlacklist(token,nome,blacklist){
    const tokenNaBlacklist = await blacklist.contemToken(token);
    if(tokenNaBlacklist){
        throw new jwt.JsonWebTokenError(`${nome} inválido por logout!`);
    }
}

function invalidaTokenJWT(token, blocklist){
    return blocklist.adiciona(token);
}
  
  async function criaTokenOpaco(id,[tempoQuantidade, tempoUnidade], whitelist){
    const tokenOpaco = crypto.randomBytes(24).toString('hex');
    const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix();
    await whitelist.adiciona(tokenOpaco, id,dataExpiracao);
    return tokenOpaco;
  }

  async function verificaTokenOpaco(token,nome, whitelist){
    verificaTokenEnviado(token, nome);
    const id = await whitelist.buscaValor(token);
    verificaTokenValido(id, nome);
    return id;
}

async function invalidaTokenOpaco(token){
    await whitelist.deleta(token)
}

module.exports ={
    access: {
        nome: 'access token',
        lista: blacklistAccessToken,
        expiracao: [15,'m'],
        cria(id){
            return criaTokenJWT(id,this.expiracao);
        },
        verifica(token){
            return verificaTokenJWT(token,this.nome, this.lista);
        },
        invalida(token){
            return invalidaTokenJWT(token, this.lista);
        }
    },
    refresh: {
        nome: 'refresh token',
        lista: whitelistRefreshToken,
        expiracao: [5, 'd'],
        cria(id){
            return criaTokenOpaco(id,this.expiracao, this.lista);
        },
        verifica(token){
            verificaTokenOpaco(token, this.nome, this.lista)
        },
        invalida(token){
            invalidaTokenOpaco(token, this.lista);
        }
    }
}

function verificaTokenValido(id, nome) {
    if (!id) {
        throw new InvalidArgumentError(`${nome} inválido`);
    }
}

function verificaTokenEnviado(token, nome) {
    if (!token) {
        throw new InvalidArgumentError(`${nome} não enviado!`);
    }
}
