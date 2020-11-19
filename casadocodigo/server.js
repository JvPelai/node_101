const http = require ('http');

const server = http.createServer(function(req,resp){
    let html = '';

    if(req.url == '/'){

        html = `
        <html>
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <h1> Casa do Código </h1>
        </body>
        </html>
        `;
    }else if(req.url == '/livros'){
        html = `
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Listagem de livros </h1>
            </body>
        </html>
        `;
    }
    resp.end(html);
});

server.listen(3000);

