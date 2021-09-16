import React from 'react';

import { useData } from '../../../utils/data';

import './style.scss';

const MajorPage: React.FC = () => {
  const data = useData('majors');

  return (
    <div className="major-page">
      Major
      {(data && data.length) ? data.map((major) => <h1>{major.Name}</h1>) : null}
    </div>
  );
};

export default MajorPage;
