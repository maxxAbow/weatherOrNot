const express = require('express');
const path = require('path')
const schedulerRouter = require('./scheduler');

const profile = express.Router();

profile.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/profile.html'));
});

// Define additional routes for /scheduler within the /profile route
profile.use('/scheduler', schedulerRouter);

module.exports = profile;
