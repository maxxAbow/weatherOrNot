const scheduler = require('express').Router();
const path = require('path');

// scheduler.get('/', (req,res) => res.sendFile(`${__dirname}../views/scheduler.html`))
scheduler.get('/scheduler', (req,res) => {
    console.log(req.method);
    res.sendFile(path.join(__dirname, '../views/scheduler.html'));
});

module.exports = scheduler;