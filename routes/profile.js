const express = require('express');
const schedulerRouter = require('./scheduler');

const profile = express.Router();

profile.get('/', (req, res) => {
  res.send('Profile page');
});

// Define additional routes for /scheduler within the /profile route
profile.use('/scheduler', schedulerRouter);

module.exports = profile;
