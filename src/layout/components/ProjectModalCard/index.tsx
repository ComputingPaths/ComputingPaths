// File: ProjectModalCard/index.tsx
// This component renders a modal that displays detailed information about a project,
// including images, description, organization, tags, members, and links to project
// resources like a website or video. The modal supports image carousels and handles
// closing when clicked outside.

import React, { useEffect, useRef, useState } from 'react';

import ExpandArrow from '../../../assets/ExpandArrow.svg';
import LeftArrow from '../../../assets/LeftArrow.svg';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import RightArrow from '../../../assets/RightArrow.svg';

import './style.scss';

// Interface for the props of ProjectModalCard
interface ProjectModalCardProps {
    description: string; // Description of the project
    organization: string; // Name of the organization related to the project
    images: string[]; // Array of image URLs for the project
    projectMembers: string[]; // Array of names of project members
    projectName: string; // Name of the project
    projectTags: ({ name: any; color: string; } | null)[]; // Tags related to the project
    projectLink?: string; // Optional link to the project's webpage
    videoURL?: string; // Optional URL for a video related to the project
    setModal: any; // Function to toggle the modal visibility
}

// ProjectModalCard component renders a detailed view of a project inside a modal,
// including images, descriptions, and member information. The modal can be closed
// by clicking outside its content area.
const ProjectModalCard: React.FC<ProjectModalCardProps> = ({
  description,
  organization,
  images,
  projectMembers,
  projectName,
  projectTags,
  projectLink,
  videoURL,
  setModal,
}) => {
  const [slide, setSlide] = useState(0); // State for the current slide in the image carousel
  const menuRef = useRef<HTMLDivElement>(null); // Ref to detect clicks outside the modal

  // Handle closing the modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (menuRef.current && (!event.target.className.includes('project-modal-card') || event.target.className === 'project-modal-card-expand-arrow')) {
      setModal(false);
    }
  };

  // Set up event listener for detecting clicks outside the modal
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  if (videoURL !== '') {
    return (
      <div ref={menuRef} className="project-modal-card">
        <section className="project-modal-card-carousel">
          {/* Display the image carousel */}
          {images.map((picture, index) => {
            if (index === slide) {
              return (
                <img className="project-modal-card-image" src={picture} alt="project" />
              );
            }
            return null;
          })}
          {/* Left and right navigation arrows */}
          <button className="project-modal-card-arrow left" type="button" onClick={() => setSlide(slide - 1 === -1 ? images.length - 1 : slide - 1)}><img className="project-modal-card-point" src={LeftArrow} alt="back arrow" /></button>
          <button className="project-modal-card-arrow right" type="button" onClick={() => setSlide(slide + 1 === images.length ? 0 : slide + 1)}><img className="project-modal-card-point" src={RightArrow} alt="right arrow" /></button>
          {/* Slide indicators */}
          <div className="project-modal-card-slide">
            {images.map((photo, index) => (
              <div className={slide === index ? 'project-modal-card-dot select' : 'project-modal-card-dot'} />
            ))}
          </div>
        </section>
        <img className="project-modal-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
        <p className="project-modal-card-tag">
          <span className="project-modal-card-project-name">{projectName}</span>
          <span className="project-modal-card-organization">{organization}</span>
          {projectTags.map((tag) => (tag && <span className={`project-modal-card-project-tag ${tag.color}`}>{tag.name}</span>))}
        </p>
        {/* Display the project description */}
        <div className="project-modal-card-section">
          <p className="project-modal-card-description">
            <span className="project-modal-card-header">Description</span>
            {description.split('\\n\\n').map((paragraph) => (
              <p className="project-modal-card-text">{paragraph}</p>
            ))}
          </p>
          {/* List of project members, More information, Website link */}
          <section className="project-modal-card-info">
            <ul className="project-modal-card-members">
              <span className="project-modal-card-header">Project Members</span>
              {projectMembers.map((name) => (
                <li>{name}</li>
              ))}
            </ul>
            <p className="project-modal-card-links">
              <span className="project-modal-card-header">More Information</span>
              <span>
                <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={projectLink}> <span className="project-modal-card-link">Project Website</span> <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
                <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={videoURL}> <span className="project-modal-card-link">Project Video</span> <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
              </span>
            </p>
          </section>
        </div>
      </div>
    );
  }
  // Below returns the same as above except with the video URL present
  return (
    <div ref={menuRef} className="project-modal-card">
      <section className="project-modal-card-carousel">
        {images.map((picture, index) => {
          if (index === slide) {
            return (
              <img className="project-modal-card-image" src={picture} alt="project" />
            );
          }
          return null;
        })}
        <button className="project-modal-card-arrow left" type="button" onClick={() => setSlide(slide - 1 === -1 ? images.length - 1 : slide - 1)}><img className="project-modal-card-point" src={LeftArrow} alt="back arrow" /></button>
        <button className="project-modal-card-arrow right" type="button" onClick={() => setSlide(slide + 1 === images.length ? 0 : slide + 1)}><img className="project-modal-card-point" src={RightArrow} alt="right arrow" /></button>
        <div className="project-modal-card-slide">
          {images.map((photo, index) => (
            <div className={slide === index ? 'project-modal-card-dot select' : 'project-modal-card-dot'} />
          ))}
        </div>
      </section>
      <img className="project-modal-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
      <p className="project-modal-card-tag">
        <span className="project-modal-card-project-name">{projectName}</span>
        <span className="project-modal-card-organization">{organization}</span>
        {projectTags.map((tag) => (tag && <span className={`project-modal-card-project-tag ${tag.color}`}>{tag.name}</span>))}
      </p>
      <div className="project-modal-card-section">
        <p className="project-modal-card-description">
          <span className="project-modal-card-header">Description</span>
          {description.split('\\n\\n').map((paragraph) => (
            <p className="project-modal-card-text">{paragraph}</p>
          ))}
        </p>
        <section className="project-modal-card-info">
          <ul className="project-modal-card-members">
            <span className="project-modal-card-header">Project Members</span>
            {projectMembers.map((name) => (
              <li>{name}</li>
            ))}
          </ul>
          <p className="project-modal-card-links">
            <span className="project-modal-card-header">More Information</span>
            <span>
              <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={projectLink}> <span className="project-modal-card-link">Project Website</span> <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProjectModalCard;
