
const notes = require('express').Router();
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {

  console.info(`${req.method} request received for notes`);

  readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data)));

});

// POST Route for a new UX/UI note
notes.post('/api/notes', (req, res) => {

  console.info(`${req.method} request received to add a tip`);

  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Tip added successfully 🚀`);

  } else {

    res.status(404).json('Error in adding note');

  };

});

module.exports = notes;