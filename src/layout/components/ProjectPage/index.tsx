import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const ProjectPage: React.FC = () => {
  const data = useData(DataTypes.Projects);

  return (
    <div className="project-page">
      Project
      {(data && data.length) ? data.map((project) => <h1>{project.Name}</h1>) : null}
    </div>
  );
};

export default ProjectPage;
