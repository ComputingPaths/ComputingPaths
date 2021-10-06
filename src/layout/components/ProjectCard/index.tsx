import React, { useEffect, useRef, useState } from 'react';

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
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      useModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <>
      <div ref={menuRef} onClick={() => useModal(!modal)} className="project-card">
        {photoURL && <img className="project-card-photo" src={photoURL.split(',')[0]} alt={`${projectName || 'Project Card'}`} />}
        <p className="project-card-section">
          <h2 className="project-card-heading">{projectName}</h2>
          <h2 className="project-card-organization">{organization}</h2>
          <span className={`project-card-project-tag ${projectTag.toLowerCase()}`}>{projectTag}</span>
          <img className="project-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
        </p>
      </div>
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
        />
      )}
    </>
  );
};

export default ProjectCard;
