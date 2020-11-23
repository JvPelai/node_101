const express = require('express')

const app = express()

app.listen(3000, () => console.log('listening on port 3000'))

app.get('/atendimentos' ,(req,res) => {
    res.send('Servidor no ar! Você está na area de atendimentos');
})