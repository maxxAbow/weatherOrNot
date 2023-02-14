const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRouter = require('./controllers/routes/login')
const schedulerRouter = require('./controllers/routes/scheduler');
const apiRouter = require('./controllers/api');

// Route for home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/login.html')));

// Route for login page
app.use('/login', loginRouter);

// Route for profile page
app.use('/scheduler', schedulerRouter);

//Route for API calls
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Connected via http://localhost:${PORT}`));

