const express = require('express');
const sequalize = require('./config/connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => console.log(`Connected via http://localhost:${PORT}`))