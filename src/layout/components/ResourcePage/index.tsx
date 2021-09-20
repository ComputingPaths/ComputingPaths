import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const ResourcePage: React.FC = () => {
  const data = useData(DataTypes.Resources);

  return (
    <div className="resource-page">
      Resource
      {data.map((resource) => <h1>{resource.Name}</h1>)}
    </div>
  );
};

export default ResourcePage;
