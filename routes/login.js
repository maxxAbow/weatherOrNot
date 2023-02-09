// const express = require('express');
// const router = express.Router();
const login = require('express').Router();
const path = require('path');

login.get('/', (req,res) => {
    res.send('Login Page');
})

module.exports = login;