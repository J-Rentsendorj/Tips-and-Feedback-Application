# Tips and Feedback Application

## Description

The **Tips and Feedback Application** is a Node.js and Express-based web application that allows users to submit tips and feedback. The application includes functionality for logging invalid form submissions, displaying feedback stored in a database, and serving a custom 404 page for non-existent routes. It demonstrates the use of RESTful API routes, dynamic front-end rendering, and error handling.

---

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Grading Requirements](#grading-requirements)
- [Deliverables](#deliverables)
- [License](#license)
- [Questions](#questions)

---

## User Story

* As a developer, I want to be able to add routes to an existing application.
* As a developer, I want to serve up a custom 404 page when the requested resource doesn't exist.
* As a developer, I want to use the given route to get information to display on a page.

---

## Acceptance Criteria

* A wildcard route in `server.js` sends users to a custom 404 page.
* A custom `404.html` page is created for the wildcard route.
* A POST route for `/api/diagnostics` stores information about invalid form submissions.
* A GET route for `/api/diagnostics` returns the content of `db/diagnostics.json`.
* A `fetch()` request on the front end sends a POST request to `/api/diagnostics` for invalid form submissions.
* The `/api/diagnostics` endpoint is tested using Insomnia.
* The wildcard route is tested by visiting a non-existent path (e.g., `http://localhost/test`).
* Feedback stored in `feedback.json` is displayed on the `feedback.html` page.

---

## Features

- **Custom 404 Page**: Displays a user-friendly message for non-existent routes.
- **Diagnostics Logging**: Logs invalid form submissions to `diagnostics.json`.
- **Feedback Display**: Dynamically displays feedback stored in `feedback.json` on the feedback page.
- **RESTful API**: Includes GET and POST routes for diagnostics and feedback.
- **Dynamic Front-End Rendering**: Uses JavaScript to dynamically create and display feedback cards.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
```

## Usage

1. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to view the application.

---

## Screenshots

![Screenshot 1](./screenshots/screenshot1.png)
![Screenshot 2](./screenshots/screenshot2.png)

---

## Technologies Used

- Node.js
- Express.js
- JavaScript
- HTML
- CSS





