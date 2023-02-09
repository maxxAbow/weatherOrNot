const profile = require('express').Router();
const path = require('path');

profile.get('/profile', (req,res) => res.send(`Profile Page`));

module.exports = profile;