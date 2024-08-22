// File: ProjectCard/index.tsx
// This component renders a card displaying project details, including the name, organization,
// tags, and a modal with more information. The card is clickable, opening a modal for detailed
// project information.

import React, { useState } from 'react';

import ProjectModalCard from '../ProjectModalCard';
import ExpandArrow from '../../../assets/ExpandArrow.svg';

import './style.scss';

// Interface for the props of ProjectCard
interface ProjectCardProps {
    description: string; // Description of the project
    organization: string; // Name of the organization related to the project
    images: string[]; // Array of image URLs for the project
    projectLink: string; // Link to the project's webpage
    projectMembers: string[]; // Array of names of project members
    projectName: string; // Name of the project
    projectTags: ({ name: any; color: string; } | null)[]; // Tags related to the project
    videoURL: string; // URL for a video related to the project
}

// ProjectCard component renders a card with project details, opening a modal on click
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
  const [modal, useModal] = useState(false); // State for controlling the modal visibility

  return (
    <div onClick={() => useModal(true)} className="project-card">
      {/* Display the first project image if available */}
      {images.length !== 0 && <img className="project-card-photo" src={images[0]} alt={`${projectName || 'Project Card'}`} />}
      {/* Display project name, organization, tags, and expand icon */}
      <p className="project-card-section">
        <h2 className="project-card-heading">{projectName}</h2>
        <h2 className="project-card-organization">{organization}</h2>
        {projectTags.map((tag) => (tag && <span className={`project-card-project-tag ${tag.color}`}>{tag.name}</span>))}
        <img className="project-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
      </p>
      {/* Render the modal with expanded project details if modal state is true */}
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
