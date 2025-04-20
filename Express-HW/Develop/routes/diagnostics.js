const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
});

module.exports = diagnostics;
