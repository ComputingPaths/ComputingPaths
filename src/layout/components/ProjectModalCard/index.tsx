import React, { useEffect, useRef, useState } from 'react';

import ExpandArrow from '../../../assets/ExpandArrow.svg';
import LeftArrow from '../../../assets/LeftArrow.svg';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import RightArrow from '../../../assets/RightArrow.svg';

import './style.scss';

interface ProjectModalCardProps {
    description: string;
    organization: string;
    photoURL: string;
    projectMembers: string;
    projectName: string;
    projectTag: string;
    projectLink?: string;
    videoURL?: string;
    setModal: any;
}

const ProjectModalCard: React.FC<ProjectModalCardProps> = ({
  description,
  organization,
  photoURL,
  projectMembers,
  projectName,
  projectTag,
  projectLink,
  videoURL,
  setModal,
}) => {
  const [slide, setSlide] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && (!event.target.className.includes('project-modal-card') || event.target.className === 'project-modal-card-expand-arrow')) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={menuRef} className="project-modal-card">
      <section className="project-modal-card-carousel">
        {photoURL.split(',').map((picture, index) => {
          if (index === slide) {
            return (
              <img className="project-modal-card-image" src={picture} alt="project" />
            );
          }
          return null;
        })}
        <button className="project-modal-card-arrow left" type="button" onClick={() => setSlide(slide - 1 === -1 ? photoURL.split(',').length - 1 : slide - 1)}><img className="project-modal-card-point" src={LeftArrow} alt="back arrow" /></button>
        <button className="project-modal-card-arrow right" type="button" onClick={() => setSlide(slide + 1 === photoURL.split(',').length ? 0 : slide + 1)}><img className="project-modal-card-point" src={RightArrow} alt="right arrow" /></button>
        <div className="project-modal-card-slide">
          {photoURL.split(',').map((photo, index) => (
            <div className={slide === index ? 'project-modal-card-dot select' : 'project-modal-card-dot'} />
          ))}
        </div>
      </section>
      <img className="project-modal-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
      <p className="project-modal-card-tag">
        <span className="project-modal-card-project-name">{projectName}</span>
        <span className="project-modal-card-organization">{organization}</span>
        <span className={`project-modal-card-project-tag ${projectTag.toLowerCase()}`}>{projectTag}</span>
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
            {projectMembers.split(',').map((name) => (
              <li>{name}</li>
            ))}
          </ul>
          <p className="project-modal-card-links">
            <span className="project-modal-card-header">More Information</span>
            <span>
              <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={projectLink}> <span className="project-modal-card-link">Project Website</span> <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
              <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={videoURL}> <span className="project-modal-card-link">Youtube Link</span> <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProjectModalCard;
