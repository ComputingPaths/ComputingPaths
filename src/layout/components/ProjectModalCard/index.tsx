import React, {
  RefObject, useEffect, useMemo, useRef, useState,
} from 'react';

import XIcon from '../../../assets/x.svg';
import LeftArrow from '../../../assets/LeftArrow.svg';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import RightArrow from '../../../assets/RightArrow.svg';

import './style.scss';

interface ProjectModalCardProps {
  description: string;
  organization: string;
  images: string[];
  projectMembers: string[];
  projectName: string;
  projectTags: ({ name: any; color: string; } | null)[];
  projectLink?: string;
  videoURL?: string;
  setModal: (showModal: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
}

const getFocusableElements = (container: HTMLElement) => Array.from(
  container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ),
).filter((element) => !element.hasAttribute('hidden') && !element.getAttribute('aria-hidden'));

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
  triggerRef,
}) => {
  const [slide, setSlide] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useMemo(
    () => `project-modal-title-${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    [projectName],
  );
  const descriptionId = useMemo(
    () => `project-modal-description-${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    [projectName],
  );

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleMouseDown = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [triggerRef]);

  const renderedLinks = [
    projectLink ? (
      <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={projectLink} key="website">
        <span className="project-modal-card-link">Project Website</span>
        <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="" />
      </a>
    ) : null,
    videoURL ? (
      <a className="project-modal-card-website" target="_blank" rel="noopener noreferrer" href={videoURL} key="video">
        <span className="project-modal-card-link">Project Video</span>
        <img className="project-modal-card-link-arrow" src={LinkedArrow} alt="" />
      </a>
    ) : null,
  ].filter(Boolean);

  return (
    <div className="project-modal-card-overlay">
      <div
        ref={dialogRef}
        className="project-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeButtonRef}
          className="project-modal-card-close"
          type="button"
          onClick={closeModal}
          aria-label="Close project details"
        >
          <img src={XIcon} alt="" />
        </button>

        <section className="project-modal-card-carousel">
          {images.map((picture, index) => {
            if (index !== slide) return null;

            return (
              <img
                className="project-modal-card-image"
                src={picture}
                alt={projectName ? `${projectName} project image ${index + 1}` : `Project image ${index + 1}`}
                key={picture}
              />
            );
          })}

          {images.length > 1 && (
            <>
              <button
                className="project-modal-card-arrow left"
                type="button"
                aria-label="Previous project image"
                onClick={() => setSlide(slide - 1 === -1 ? images.length - 1 : slide - 1)}
              >
                <img className="project-modal-card-point" src={LeftArrow} alt="" />
              </button>
              <button
                className="project-modal-card-arrow right"
                type="button"
                aria-label="Next project image"
                onClick={() => setSlide(slide + 1 === images.length ? 0 : slide + 1)}
              >
                <img className="project-modal-card-point" src={RightArrow} alt="" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="project-modal-card-slide" aria-hidden="true">
              {images.map((photo, index) => (
                <div key={photo} className={slide === index ? 'project-modal-card-dot select' : 'project-modal-card-dot'} />
              ))}
            </div>
          )}
        </section>

        <div className="project-modal-card-tag">
          <h2 id={titleId} className="project-modal-card-project-name">{projectName}</h2>
          <p className="project-modal-card-organization">{organization}</p>
          {projectTags.map((tag, index) => (tag ? <span key={`${tag.name}-${index}`} className={`project-modal-card-project-tag ${tag.color}`}>{tag.name}</span> : null))}
        </div>

        <div className="project-modal-card-section">
          <div className="project-modal-card-description">
            <h3 className="project-modal-card-header">Description</h3>
            <div id={descriptionId}>
              {description.split('\\n\\n').map((paragraph, index) => (
                <p className="project-modal-card-text" key={`${projectName}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <section className="project-modal-card-info">
            <div className="project-modal-card-members-section">
              <h3 className="project-modal-card-header">Project Members</h3>
              <ul className="project-modal-card-members">
                {projectMembers.map((name, index) => (
                  <li key={`${name}-${index}`}>{name}</li>
                ))}
              </ul>
            </div>

            {renderedLinks.length > 0 && (
              <div className="project-modal-card-links">
                <h3 className="project-modal-card-header">More Information</h3>
                <div className="project-modal-card-links-list">
                  {renderedLinks}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectModalCard;
