


module.exports = app => {
    app.get('/atendimentos' ,(req,res) => {
        res.send('Servidor no ar! Você está na area de atendimentos');
    })

    app.post('/atendimento', (req,res) => {
        console.log(req.body)
        res.send('Você está na rota de atendimentos e está realizando um POST')

    })
}