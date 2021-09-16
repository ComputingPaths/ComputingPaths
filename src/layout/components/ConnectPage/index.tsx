import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const ConnectPage: React.FC = () => {
  const data = useData(DataTypes.Orgs);

  return (
    <div className="connect-page">
      Connect
      {(data && data.length) ? data.map((org) => <h1>{org.Name}</h1>) : null}
    </div>
  );
};

export default ConnectPage;
