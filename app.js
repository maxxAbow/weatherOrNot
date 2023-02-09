const express = require('express');
const sequalize = require('./config/connection');

const app = express();

app.use(express.static('views'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;

// Route for home/login page
// app.get('/', (req, res) => res.sendFile(`${__dirname}/views/login.html`))

app.use('/login', require('./routes/login'))
app.listen(PORT, () => console.log(`Connected via http://localhost:${PORT}`))