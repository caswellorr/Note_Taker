
const notes = require('express').Router();

const { 
  readAndAppend, 
  readFromFile, 
  writeToFile } = require('../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {

  console.info(`${req.method} request received for notes`);

  readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data)));

});


// POST Route for submitting note
notes.post('/', (req, res) => {
  
  console.info(`${req.method} request received to add a note`);
  
  console.log(req.body);
  
  const { title, text } = req.body;
  
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    
    readAndAppend(newNote, './db/notes.json');
    
    const response = {
      status: `Note added successfully 🚀`,
      body: newNote,
    };
    
    res.json(response);
    
  } else {
    
    res.status(404).json('Error in adding note');
    
  };
  
});

// GET route that returns a specific note
notes.get('/:note_id', (req, res) => {

  const noteId = req.params.note_id;

  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {

      const result = json.filter((note) => note.note_id === noteId);

      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');

    })
});

// DELETE Route for a specific tip
notes.delete(`/:${note_id}`, (req, res) => {

  const noteId = req.params.note_id;

  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/notes.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;
                                              