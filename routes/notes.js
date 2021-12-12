
const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {

  console.info(`${req.method} request received for notes`);

  readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data)));

});

// POST Route for submitting note
notes.post('/api/notes', (req, res) => {

  console.info(`${req.method} request received to add a note`);

  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: '`Tip added successfully 🚀`',
      body: newNote,
    };

    res.json(response);

  } else {

    res.status(404).json('Error in adding note');

  };

});

module.exports = notes;