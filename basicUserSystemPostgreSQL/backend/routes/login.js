const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require("../config/database");
const app = express();

app.get('/login', function (req, res) {
    res.render('login')
})

app.post('/login', async function (req, res) {
    try {
        // Extract email and password from the req.body object
        const { email, password } = req.body;
        //check if email exists 
        const userData = await client.query(`SELECT * FROM users WHERE email=$1`,[email]);
        //returns an array of obj
        const user = userData.rows
        if (user.length === 0) {
            return res.status(401).render("login", { message: "User is not registered, Sign up first" });
        } else {
            //compare the hashed password
            bcrypt.compare(password, user[0].password, (err, userDoc) => {
                if (err) {
                    return res.status(500).render("login", { message: "Internal Server Error" });
                } else if(userDoc){
                    //if password's valid, generate token auth(needed to perform an action)
                    const token = jwt.sign({
                        email: user.email,
                    }, process.env.SECRET_KEY
                    );
                    return res.status(200).render("profile", {
                        message: "User Logged in Successfully",
                        name:user[0].name, //user.name used since userDoc has a value of true/false and not the properties
                        email:email
                    });
                } else {
                    return res.status(401).render("login", { message: "Invalid Email/Password" });
                }
            });
        }
    }
    catch {
        return res.status(500).render("login", { message: "Internal Server Error" });
    }
})

module.exports = app;
