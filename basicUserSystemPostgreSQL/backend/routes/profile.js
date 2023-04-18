const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.get('/profile', function(req,res){
    res.render("profile")
})

module.exports = app;
