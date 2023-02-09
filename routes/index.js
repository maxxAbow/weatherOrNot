const express = require('express');

// Import our modular routers for /login, /profile, and /scheduler
const loginRouter = require('./login');
const profileRouter = require('./profile');
const schedulerkRouter = require('./scheduler');

const app = express();

app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/scheduler', schedulerkRouter);