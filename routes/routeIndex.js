const express = require('express');

// Import our modular routers for /index and /notes
const landingRouter = require('./tips');
const notesRouter = require('./feedback');

const app = express();

app.use('/landing', landingRouter);
app.use('/notes', notesRouter);

module.exports = app;