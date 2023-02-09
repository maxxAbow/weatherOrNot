const express = require('express');
const sequalize = require('./config/connection');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('views'))


// Route for home/login page
app.get('/', (req, res) => res.sendFile(`${__dirname}/views/index.html`)) //rename this file to index.html

// Route for profile page
// app.get('/profile', (req,res) => res.sendFile(`${__dirname}/views/profile.html`))
app.get('/profile', require('./routes/profile'))

// Route for scheduler page
app.get('/scheduler', require('./routes/scheduler'))

// app.use('/login', require('./routes/login'))
app.listen(PORT, () => console.log(`Connected via http://localhost:${PORT}`))