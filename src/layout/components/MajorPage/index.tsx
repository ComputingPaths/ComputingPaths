import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const MajorPage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Majors).then((result) => setData(result));
  }, []);

  return (
    <div className="major-page">
      Major
      {(data && data.length) ? data.map((major) => <h1>{major.Name}</h1>) : null}
    </div>
  );
};

export default MajorPage;
