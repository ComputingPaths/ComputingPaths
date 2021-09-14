import React from 'react';

import { useData } from '../../../utils/data';

import './style.scss';

const ResourcePage: React.FC = () => {
  const data = useData('resources');

  return (
    <div className="resource-page">
      Resource
      {(data && data.length) ? data.map((resource) => <h1>{resource.Name}</h1>) : null}
    </div>
  );
};

export default ResourcePage;
