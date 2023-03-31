const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const app = express();

app.get('/register', function (req, res) {
    res.render("register")
})
app.post('/register', function (req, res) {
    const body = req.body
    let name = body.name
    let email = body.email
    let password = body.password
    let password_confirmed = body.password_confirmed
    let role = body.role
    //encrypt password 
    let user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });
    if (password !== password_confirmed) {
        return res.render('register', {
            message: 'Passwords do not match!'
        });
    }
    //check if user email is registred
    User.findOne({ email: email }, function (err, userDoc) {
        if (userDoc) {
            return res.render('register', {
                message: 'This email is already in use'
            });
        }
        if (err) {
            return res.json({ err });
        }
        else {
            user.save(function (err, userDoc) {
                if (err) {
                    return res.json({ err });
                }
                else {
                    return res.render('register', {
                        message: 'User Registered!'
                    });
                }
            });
        }
    });
});


module.exports = app;
