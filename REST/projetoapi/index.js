const customExpress = require('./config/customExpress');
const db = require('./infra/database/connection');
const Tables = require('./infra/database/tables');

db.connect(erro => {
    if(erro){
        console.log(erro);
    }else{  
        console.log('conecction succesfull');
        Tables.init(db);
        const app = customExpress();
   
        app.listen(3000, () => console.log('listening on port 3000'));
    }
});

