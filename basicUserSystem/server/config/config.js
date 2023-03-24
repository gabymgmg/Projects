// access port of localhost
process.env.PORT = process.env.PORT || 3000;
// dev environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// token caducity
process.env.CADUCIDAD_TOKEN = '48h';
//SEED authentication
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';

//differences between .env and this file

/*cadena de conexion db
let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/mediumNodeLogin";
} else {
    urlDB = "here write the mongo connection with mongo atlas and other type of connection mode"
};
process.env.URLDB = urlDB;*/