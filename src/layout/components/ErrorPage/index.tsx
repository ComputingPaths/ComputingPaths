import React from 'react';
import { Link } from 'react-router-dom';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const ErrorPage: React.FC = () => {
  const data = useData(DataTypes.Errors);

  const error = data[Math.floor(Math.random() * data.length)] || {};

  console.log(data);

  if (!error.Message) {
    error.Message = 'Error 404: Unable to find the page you were looking for.';
  }

  return (
    <div className="error-page">
      {error.Image && <img className="error-page-image" src={error.Image} alt="Error Page" />}
      <p className="error-page-message">{error.Message}</p>
      <Link to="/">
        <button className="error-page-button" type="button">Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
