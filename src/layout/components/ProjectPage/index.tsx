import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const ProjectPage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Projects).then((result) => setData(result));
  }, []);

  return (
    <div className="project-page">
      Project
      {(data && data.length) ? data.map((project) => <h1>{project.Name}</h1>) : null}
    </div>
  );
};

export default ProjectPage;
