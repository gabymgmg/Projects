const express = require('express')
const app = express()
app.use(require('./login'));
app.use(require('./register'));
app.use(require('./profile'));
app.use(require('./logout'));

module.exports = app;
