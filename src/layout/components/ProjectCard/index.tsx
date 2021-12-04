import React, { useState } from 'react';

import ProjectModalCard from '../ProjectModalCard';
import ExpandArrow from '../../../assets/ExpandArrow.svg';

import './style.scss';

interface ProjectCardProps {
    description: string;
    organization: string;
    images: string[];
    projectLink: string;
    projectMembers: string[];
    projectName: string;
    projectTags: ({ name: any; color: string; } | null)[];
    videoURL: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  description,
  organization,
  images,
  projectLink,
  projectMembers,
  projectName,
  projectTags,
  videoURL,
}) => {
  const [modal, useModal] = useState(false);

  return (
    <div onClick={() => useModal(true)} className="project-card">
      {images.length !== 0 && <img className="project-card-photo" src={images[0]} alt={`${projectName || 'Project Card'}`} />}
      <p className="project-card-section">
        <h2 className="project-card-heading">{projectName}</h2>
        <h2 className="project-card-organization">{organization}</h2>
        {projectTags.map((tag) => (tag && <span className={`project-card-project-tag ${tag.color}`}>{tag.name}</span>))}
        <img className="project-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
      </p>
      {modal && (
        <ProjectModalCard
          description={description}
          organization={organization}
          images={images}
          projectMembers={projectMembers}
          projectName={projectName}
          projectTags={projectTags}
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
