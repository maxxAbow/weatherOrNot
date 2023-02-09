const express = require('express');

// Import our modular routers for /tips and /feedback
const loginRouter = require('./login');
const profileRouter = require('./profile');
const schedulerkRouter = require('./scheduler');


const app = express();