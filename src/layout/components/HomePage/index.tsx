import React from 'react';

import { useData } from '../../../utils/data';

import './style.scss';

const HomePage: React.FC = () => {
  const data = useData('departments');

  return (
    <div className="home-page">
      Home
      {(data && data.length) ? data.map((department) => <h1>{department.Name}</h1>) : null}
    </div>
  );
};

export default HomePage;
