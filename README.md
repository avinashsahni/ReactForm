Frequent Research Form
Overview
The Frequent Research Form is a React application that allows users to fill out a form with personal details, including name, email, gender, date of birth, and location (country, state, and city). The application performs real-time validation and displays the entered data on a separate page upon submission.

Features
Country, State, and City Selection: Dynamically updates state and city options based on the selected country and state.
Real-time Form Validation: Ensures that the input data meets specified criteria.
Age Calculation: Automatically calculates and displays the user's age based on their date of birth.
Form Submission: Validates and submits form data, navigating to a display page with the entered information.
Technologies Used
React: Frontend library for building user interfaces.
React Router DOM: For routing and navigation within the application.
Country-State-City Library: To retrieve and display country, state, and city data.
Installation
To get started with this project, follow these steps:

Clone the Repository
git clone https://github.com/your-username/frequent-research-form.git

Navigate to the Project Directory

cd frequent-research-form
Install Dependencies

Make sure you have Node.js and npm installed. Run the following command to install the necessary dependencies:


npm install

Start the development server with:

npm start
Open your browser and navigate to http://localhost:3000 to view the application.

Usage
Fill Out the Form

Enter your first name, last name, email, and select your gender.
Choose your country from the dropdown list. The state dropdown will be populated based on your country selection.
Choose your state from the dropdown list. The city dropdown will be populated based on your state selection.
Enter your date of birth. The age will be calculated automatically.
Submit the form by clicking the "Save" button.
View Submitted Data

After submitting the form, you will be redirected to the "Display Data" page, where you can view the details you entered.

Components
App: Main component that contains the form and handles form submission.
DisplayData: Component that displays the submitted form data.
AppRouter: Sets up the router and routes for the application.
Form Validation Rules
First Name and Last Name: Must contain only alphabetic characters.
Email: Must be in a valid email format.
Date of Birth: Must result in an age between 14 and 99 years.
Customization
You can customize the form by modifying the app.css file for styling or adjusting the validation rules and options in the App component.
