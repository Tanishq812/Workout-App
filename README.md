# Health Challenge Tracker

This is a web application built with Angular for tracking workouts in health challenges. The application allows users to add workouts, filter users by name and workout type, and view detailed workout progress for each user.

## Features

- Add new workouts for users
- Filter users by name and workout type
- Display user workout details in a paginated table
- View detailed workout progress in a bar chart
- Responsive design using Tailwind CSS

## Technologies Used

- Angular
- Tailwind CSS
- ngx-charts
- ngx-pagination

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)
- Angular CLI (version 11 or later)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Tanishq812/Workout-App
    cd health-challenge-tracker
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`.

### Running Tests

1. Run the tests:
    ```bash
    ng test
    ```

2. Generate test coverage reports:
    ```bash
    ng test --code-coverage
    ```

3. View the coverage report:
    After running the above command, open the `coverage` directory in the project root and open the `index.html` file in a web browser to view the test coverage report.

## Project Structure

health-challenge-tracker/
├── e2e/ # End-to-end tests
├── src/ # Source files
│ ├── app/ # Angular components and services
│ ├── assets/ # Static assets
│ ├── environments/ # Environment configuration
│ ├── styles.css # Global styles
│ └── index.html # Main HTML file
├── angular.json # Angular CLI configuration
├── package.json # Node.js dependencies and scripts
└── README.md # Project documentation
