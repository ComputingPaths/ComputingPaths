import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const HomePage: React.FC = () => {
  const data = useData(DataTypes.Departments);

  return (
    <div className="home-page">
      Home
      {data.map((department) => <h1>{department.Name}</h1>)}
    </div>
  );
};

export default HomePage;
