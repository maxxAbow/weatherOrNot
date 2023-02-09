const login = require('express').Router();
const path = require('path');

login.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
})

module.exports = login;