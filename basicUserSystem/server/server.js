// exporting dependencies
require('dotenv').config({path: __dirname + '/.env'})
require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Configuracion global de rutas
app.use(require('./routes/index'));
//ruta raiz
let renderHTML = path.resolve(__dirname, '../public/index.html');
app.get('/', function (req, res) {
    res.sendFile(renderHTML);
})
//DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) throw err;
    console.log("DB active");
});
// server 
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})