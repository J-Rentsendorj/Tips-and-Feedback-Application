const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils'); // Import helper functions

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// Middleware for logging incoming requests
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

// POST Route for logging diagnostics
app.post('/api/diagnostics', (req, res) => {
  console.log(req.body); // Log the request body
  const { time, error_id, errors } = req.body;

  // Validate the request body
  if (time && error_id && errors) {
    const newDiagnostic = { time, error_id, errors };

    // Append the new diagnostic to the diagnostics.json file
    readAndAppend(newDiagnostic, './db/diagnostics.json');

    res.status(201).json({ status: 'success', body: newDiagnostic });
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid request body' });
  }
});

// GET Route for retrieving diagnostics information
app.get('/api/diagnostics', (req, res) => {
  readFromFile('./db/diagnostics.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ status: 'error', message: err.message }));
});

// GET Route for retrieving feedback information
app.get('/api/feedback', (req, res) => {
  readFromFile('./db/feedback.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ status: 'error', message: err.message }));
});

// Wildcard route to serve the 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
