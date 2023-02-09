const scheduler = require('express').Router();

scheduler.get('/', (req, res) => {
  console.log(req.method);
  res.send('Scheduler page');
});

module.exports = scheduler;