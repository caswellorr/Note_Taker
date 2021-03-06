
const express = require('express');
// node package used to send 
const path = require('path');
// fetch data 
const api = require('./routes/index.js');

// deployment port
const PORT = process.env.port || 3001;

//  initialize express
const app = express();

// initialize Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// creates static folder to send static front-end files
app.use(express.static('public'));

// create end points

app.get('/', (req, res) =>

  res.sendFile(path.join(__dirname, '/public/index.html'))

);

// GET Route for notes page
app.get('/notes', (req, res) =>

  res.sendFile(path.join(__dirname, '/public/notes.html'))

);

// GET Route for landing (*) -- catch all
app.get('*', (req, res) =>

  res.sendFile(path.join(__dirname, 'public/index.html'))

);

// Listen on port
app.listen(PORT, () =>

  console.log(`App listening at http://localhost:${PORT} 🚀`)

);