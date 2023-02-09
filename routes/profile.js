const profile = require('express').Router();
const path = require('path');

profile.get('/profile', (req,res) => res.sendFile(path.join(__dirname,'../views/profile.html')));

module.exports = profile;