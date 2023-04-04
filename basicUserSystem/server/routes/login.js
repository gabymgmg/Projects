const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const app = express();


app.get('/login', function (req, res) {
    res.render('login')
})
app.post('/login', async function (req, res) {
    try {
        // Extract email and password from the req.body object
        const { email, password } = req.body;
        //check if email exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).render("login", { message: "User not registered" });
        }
        bcrypt.compare(password, user.password, (err, userDoc) => {
            if (err) {
                return res.status(500).render("login", { message: "Internal Server Error" });
            }
            if (userDoc) {
                //if password's valid, generate token auth(needed to perform an action)
                let token = jwt.sign({
                    usuario: userDoc,
                }, process.env.SEED_AUTENTICACION, {
                    expiresIn: process.env.CADUCIDAD_TOKEN
                })
                return res.status(200).render("profile",
                    {
                        message: "User Logged in Successfully",
                        name:user.name, //user.name used since userDoc has a value of true/false and not the properties
                        email:user.email
                    });
            } else {
                return res.status(401).render("login", { message: "Invalid Email/Password" });
            }
        });
    }
    catch {
        return res.status(500).render("login", { message: "Internal Server Error" });
    }
})

module.exports = app;
