const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const app = express();
app.get('/register', function(req,res){
    res.render("register")
})
app.post('/register', function (req, res) {
    const body = req.body
    let name = body.name
    let email = body.email
    let password = body.password
    let role = body.role
    console.log(name,email)
    //encrypt password 
    let user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });
    user.save(function (err, userDoc) {
        if (err) {
            return res.json({ err })
        }
        else {
            return res.json({
                usuario: userDoc,
              })
        }
    })
})
module.exports = app;

//it's the same if I use create instead of save?