import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const ErrorPage: React.FC = () => (
  <div className="error-page">
    <p className="error-page-message">Oops, our gears are broken. Let’s find you a better page for you to go to.</p>
    <Link to="/">
      <button className="error-page-button" type="button">Home</button>
    </Link>
  </div>
);

export default ErrorPage;
