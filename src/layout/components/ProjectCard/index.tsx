import React, { useState } from 'react';

import ProjectModalCard from '../ProjectModalCard';
import ExpandArrow from '../../../assets/ExpandArrow.svg';

import './style.scss';

interface ProjectCardProps {
    description: string;
    organization: string;
    photoURL: string;
    projectLink: string;
    projectMembers: string;
    projectName: string;
    projectTag: string;
    videoURL: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  description,
  organization,
  photoURL,
  projectLink,
  projectMembers,
  projectName,
  projectTag,
  videoURL,
}) => {
  const [modal, useModal] = useState(false);

  return (
    <div onClick={() => useModal(true)} className="project-card">
      {photoURL && <img className="project-card-photo" src={photoURL.split(',')[0]} alt={`${projectName || 'Project Card'}`} />}
      <p className="project-card-section">
        <h2 className="project-card-heading">{projectName}</h2>
        <h2 className="project-card-organization">{organization}</h2>
        <span className={`project-card-project-tag ${projectTag.toLowerCase()}`}>{projectTag}</span>
        <img className="project-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
      </p>
      {modal && (
        <ProjectModalCard
          description={description}
          organization={organization}
          photoURL={photoURL}
          projectMembers={projectMembers}
          projectName={projectName}
          projectTag={projectTag}
          projectLink={projectLink}
          videoURL={videoURL}
          setModal={(showModal) => {
            useModal(showModal);
          }}
        />
      )}
    </div>
  );
};

export default ProjectCard;
