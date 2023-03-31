const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const app = express();


app.get('/login', function(req,res){
    res.render('login')
})
app.post('/login', function (req, res) {
    const body = req.body
    //check if email exists
    User.findOne({ email: body.email }, function (err, userDoc) {
        if (err) {
            return res.json({ err })
        }
        // if email doesn't exists
        if (!userDoc) {
            return res.json({ err: 'invalid email or password' })
        }
        //in case it exists, check if password is the same from DB 
        if (!bcrypt.compareSync(body.password, userDoc.password)) {
            return res.json({ error: 'invalid password' })
        }
        //if password's valid, generate token auth
        let token = jwt.sign({
            usuario: userDoc,
        }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })
        res.json({
            usuario: userDoc,
            token
          })

    })
})
module.exports = app;
