const feedbackForm = document.getElementById('feedback-form');
const homeBtn = document.getElementById('home-btn');

// Redirect to homepage when the home button is clicked
if (homeBtn) {
  homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/';
  });
}

// Function to create feedback cards
const createFeedbackCard = (feedback) => {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3', 'm-3');

  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add('card-header', 'bg-primary', 'text-light', 'p-2', 'm-0');
  cardHeaderEl.innerHTML = `Email: ${feedback.email}`;

  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>Feedback: ${feedback.feedback}</p>`;

  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  const feedbackContainer = document.getElementById('feedback-container');
  if (feedbackContainer) {
    feedbackContainer.appendChild(cardEl);
  }
};

// Fetch feedback data from the server
const getFeedback = () => {
  fetch('/api/feedback', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((feedback) => createFeedbackCard(feedback));
    })
    .catch((error) => {
      console.error('Error fetching feedback:', error);
    });
};

// Load feedback when the page loads
document.addEventListener('DOMContentLoaded', () => {
  getFeedback();
});
