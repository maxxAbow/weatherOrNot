const express = require('express');
const sequalize = require('sequalize');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const app = express();