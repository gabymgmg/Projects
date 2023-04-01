const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const app = express();

app.get('/register', function (req, res) {
    res.render("register")
});

app.post('/register', function (req, res) {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const password_confirmed = body.password_confirmed;
    const role = body.role;
    
    if (password !== password_confirmed) {
        return res.render('register', {
            message: 'Passwords do not match!'
        });
    }

    User.findOne({ email: email }, function (err, userDoc) {
        if (err) {
            return res.json({ err });
        }

        if (userDoc) {
            return res.render('register', {
                message: 'This email is already in use'
            });
        }

        const user = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            role
        });

        user.save(function (err, userDoc) {
            if (err) {
                return res.json({ err });
            } else {
                return res.render('profile',{name:userDoc.name,email:userDoc.email})

            }
        });
    });
});

module.exports = app;
