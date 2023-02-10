const express = require('express');
const sequalize = require('./config/connection');
// const path = require('path');
const PORT = process.env.PORT || 3001;
const loginRouter = require('./controllers/routes/login')
const profileRouter = require('./controllers/routes/profile');

const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for home page
app.get('/', (req, res) => res.send('Home Page'));

// Route for login page
app.use('/login', loginRouter);

// Route for profile page
app.use('/profile', profileRouter);

app.listen(PORT, () => console.log(`Connected via http://localhost:${PORT}`));