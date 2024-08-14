// File: ErrorPage/index.tsx
// This file defines the ErrorPage component, which is displayed when a user navigates
// to a route that does not exist or encounters an error on the website.
// The component provides a simple message and a button to redirect users back to the homepage.

import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

// The ErrorPage component is a functional component that renders an error message
// and a button for users to navigate back to the homepage.
const ErrorPage: React.FC = () => (
  <div className="error-page">
    <p className="error-page-message">Oops, our gears are broken. Let’s find you a better page for you to go to.</p>
    <Link to="/">
      <button className="error-page-button" type="button">Home</button>
    </Link>
  </div>
);

export default ErrorPage;
