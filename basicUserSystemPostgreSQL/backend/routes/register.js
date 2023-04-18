const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const client = require("../config/database");

const app = express();

app.get('/register', function (req, res) {
    res.render("register")
});

app.post('/register', async function (req, res) {
    try {
        const { body, name, email, password, password_confirmed, role } = req.body
        if (password !== password_confirmed) {
            return res.render('register', {
                message: 'Passwords do not match!'
            });
        }
        //check if user exists. Use arrays to avoid SQL injection
        const userData = await client.query(`SELECT * FROM users WHERE email=$1`,[email]);
        const data = userData.rows
        if (data.length>0) {
            return res.status(401).render("register",
                { message: "User already registered" });
        };

        bcrypt.hash(password, 10, (err, hash) => {
            if (err)
                return res.status(err).render("register",
                { message: "Server error" });

            const user = {
            name,
            email,
            password: hash,
            };

        //Inserting data into the database
            client.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,
                [user.name,user.email,user.password],(err)=>{
                    if(err){
                        return res.status(500).render("register",
                        { message: "Database error" });
                    }
                    else {
                        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY); //Signing a jwt token
                        return res.render('profile', { name: user.name, email: user.email });
                    }
            })
        })
    }
    catch (err) {
        return res.status(500).render("register", { message: "Internal Server Error" });
    }
});

module.exports = app;