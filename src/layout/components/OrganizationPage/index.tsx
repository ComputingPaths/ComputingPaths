import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const OrganizationPage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Orgs).then((result) => setData(result));
  }, []);

  return (
    <div className="organization-page">
      Organization
      {data.map((org) => <h1>{org.Name}</h1>)}
    </div>
  );
};

export default OrganizationPage;
