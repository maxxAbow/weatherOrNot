const express = require('express');
const schedulerRouter = require('./scheduler');

const profile = express.Router();

profile.get('/profile', (req,res) => res.sendFile(path.join(__dirname,'../views/profile.html')));

profile.use('/scheduler', require('./scheduler'));
module.exports = profile;