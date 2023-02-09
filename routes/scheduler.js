const scheduler = require('express').Router();
const path = require('path')

scheduler.get('/', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '../views/scheduler.html'));
});

module.exports = scheduler;