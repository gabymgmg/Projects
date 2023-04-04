const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
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
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(401).render("register",
                { message: "User already registered" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        const userSaved = await user.save();
        return res.render('profile', { name: userSaved.name, email: userSaved.email });
    }
    catch (err) {
        return res.status(500).render("register", { message: "Internal Server Error" });
    }
});

module.exports = app;
