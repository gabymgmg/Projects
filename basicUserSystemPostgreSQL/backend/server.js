//importing modules
const express = require('express')
//assigning the variable app to express
const app = express()
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors');
const client = require('./config/database')
const path = require('path')
const publicDir = path.join(__dirname, '../public') 
const hbs = require('hbs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Set up the view engine (Handlebars)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

//middleware
app.use(express.json())
app.use(cors());
app.use(cookieParser())
// Configuracion global de rutas
app.use(require('./routes/index'));

//ruta raiz
app.get("/", (req, res) => {
    res.render("index")
})
// static files
app.use(express.static(publicDir))

//DB connection 
client.connect()
  .then(() => {
    console.log('Database connected to discover');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

//listening to server connection
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})