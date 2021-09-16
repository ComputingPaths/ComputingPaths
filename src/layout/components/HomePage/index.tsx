import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const HomePage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Departments).then((result) => setData(result));
  }, []);

  return (
    <div className="home-page">
      Home
      {(data && data.length) ? data.map((department) => <h1>{department.Name}</h1>) : null}
    </div>
  );
};

export default HomePage;
