import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const OrganizationPage: React.FC = () => {
  const data = useData(DataTypes.Orgs);

  return (
    <div className="organization-page">
      Organization
      {(data && data.length) ? data.map((org) => <h1>{org.Name}</h1>) : null}
    </div>
  );
};

export default OrganizationPage;
