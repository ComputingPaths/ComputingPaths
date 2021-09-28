import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';

import ResourceCard from '../ResourceCard';

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
      <h1 className="resource-page-title">Resources</h1>
      <p className="resource-page-text">Become familiar with campus resources</p>
      <div className="resource-page-resources">
        {data.map((resource) => (
          <ResourceCard
            photoURL={resource.Mapimage}
            title={resource.Name}
            tags={resource.Tags}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcePage;
