const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const app = express();

app.post('/register', function (req, res) {
    const body = req.body
    let { name, email, password, role } = body;
    //encryp password 
    let user = new User({
        nombre,
        password: bcrypt.hashSync(password, 10),
        role
    });
    user.save(function (err, userDoc) {
        if (err) {
            return res.json({ err })
        }
        else {
            res.json({ user })
        }
    })
})
module.exports = app;

//it's the same if I use create instead of save?