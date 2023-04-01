// exporting dependencies
require('dotenv').config()
require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const publicDir = path.join(__dirname, '../public') 
const hbs = require('hbs')
console.log(publicDir)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Configuracion global de rutas
app.use(require('./routes/index'));
// Set up the view engine (Handlebars)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');


//ruta raiz
app.get("/", (req, res) => {
    res.render("index")
})
// static files
app.use(express.static(publicDir))

//DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;
    }
    console.log("DB active");
});
// server 
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})