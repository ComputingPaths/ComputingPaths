import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const ResourcePage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Resources)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);

  return (
    <div className="resource-page">
      Resource
      {data.map((resource) => <h1>{resource.Name}</h1>)}
    </div>
  );
};

export default ResourcePage;
