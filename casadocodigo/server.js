const express = require('express');
const app = express();

app.get('/', function(req,resp){
    resp.send(

        `
        <html>
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <h1> Casa do Código </h1>
        </body>
        </html>
        `
    );
});
app.get('/livros',function(req,resp){
    resp.send(
        `
        <html>
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <h1> Listagem de livros </h1>
        </body>
        </html>
        `
    ); 
});
    


app.listen(3000, function(){
    console.log('listening on port 3000');
});

