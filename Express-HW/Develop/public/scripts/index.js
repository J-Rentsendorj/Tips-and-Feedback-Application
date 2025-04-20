const tipForm = document.getElementById('tip-form');
const tipsContainer = document.getElementById('tip-container');
const fbBtn = document.getElementById('feedback-btn');

fbBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/feedback';
});

const createCard = (tip) => {
  // Create card
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3', 'm-3');
  cardEl.setAttribute('key', tip.tip_id);

  // Create card header
  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-2',
    'm-0'
  );
  cardHeaderEl.innerHTML = `${tip.username} </br>`;

  // Create card body
  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>${tip.tip}</p>`;

  // Append the header and body to the card element
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the tips container in the DOM
  tipsContainer.appendChild(cardEl);
};

// Get a list of existing tips from the server
const getTips = () =>
  fetch('/api/tips', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });

// Post a new tip to the page
const postTip = (tip) =>
  fetch('/api/tips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tip),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(tip);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

// When the page loads, get all the tips
getTips().then((data) => data.forEach((tip) => createCard(tip)));

// Function to validate the tips that were submitted
const validateTip = (newTip) => {
  const { username, topic, tip } = newTip;

  // Object to hold our error messages until we are ready to return
  const errorState = {
    username: '',
    tip: '',
    topic: '',
  };

  // Bool value if the username is valid
  const utest = username.length >= 4;
  if (!utest) {
    errorState.username = 'Invalid username!';
  }

  // Bool value to see if the tip being added is at least 15 characters long
  const tipContentCheck = tip.length > 15;
  if (!tipContentCheck) {
    errorState.tip = 'Tip must be at least 15 characters';
  }

  // Bool value to see if the topic is either UX or UI
  const topicCheck = topic.includes('UX' || 'UI');
  if (!topicCheck) {
    errorState.topic = 'Topic not relevant to UX or UI';
  }

  const result = {
    isValid: !!(utest && tipContentCheck && topicCheck),
    errors: errorState,
  };

  // Return result object with a isValid boolean and an errors object for any errors that may exist
  return result;
};

// Helper function to deal with errors that exist in the result
const showErrors = (errorObj) => {
  const errors = Object.values(errorObj);
  errors.forEach((error) => {
    if (error.length > 0) {
      alert(error);
    }
  });
};

// Helper function to send a POST request to the diagnostics route (/api/diagnostics)
const submitDiagnostics = (submissionObj) => {
  fetch('/api/diagnostics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      time: Date.now(),
      error_id: crypto.randomUUID(), // Generate a unique ID for the error
      errors: submissionObj.errors,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.info('Diagnostics submitted:', data);
    })
    .catch((error) => {
      console.error('Error submitting diagnostics:', error);
    });
};

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Form submit invoked');

  const tipContent = document.getElementById('tipText').value;
  const tipUsername = document.getElementById('tipUsername').value.trim();

  const newTip = {
    username: tipUsername,
    topic: 'UX',
    tip: tipContent,
  };

  const submission = validateTip(newTip);

  if (submission.isValid) {
    postTip(newTip);
  } else {
    submitDiagnostics(submission); // Send invalid submission to diagnostics
    showErrors(submission.errors); // Display validation errors to the user
  }
};

// Listen for when the form is submitted
tipForm.addEventListener('submit', handleFormSubmit);
