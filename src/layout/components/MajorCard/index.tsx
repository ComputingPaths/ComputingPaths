// File: MajorCard/index.tsx
// This component displays details about a major, including image, description, departments,
// links, and specializations. Tags are added based on whether the major is capped or its degree type.

import React, { useState } from 'react';
import LinkedArrow from '../../../assets/LinkedArrow.svg'; // Arrow icon for external links
import Caret from '../../../assets/caret.svg'; // Caret icon for expandable sections
import './style.scss'; // Importing styles specific to MajorCard

// Interface for the props of MajorCard
interface MajorCardProps {
  image: string; // URL of the major's image
  name: string; // Name of the major
  capped: boolean; // Indicates if the major is capped
  degreeType: string; // Type of degree
  description: string; // Description of the major
  departments: { title: string; url: string; }[]; // List of departments offering the major
  links: { title: string; url: string }[]; // Additional links related to the major
  specializations: { name: string, detail: string }[]; // Specializations within the major
  note: string; // Additional notes about the major
}

// Interface for the tags representing the major's attributes
interface Tag {
  name: string; // Name of the tag
  color: string; // Corresponding color class for the tag
}

// Mapping degree types and other attributes to specific colors for tags
const tagColorMap: { [key: string]: string } = {
  /* Add new colors for new bachelor degrees here in the future.
  Refer to color list in ../styles/_vars.scss */
  Capped: 'light-yellow',
  'Bachelor of Art (BA)': 'light-blue',
  'Bachelor of Science (BS)': 'mint',
};

// MajorCard component renders details about a major, including its image, description,
// departments, links, and specializations.
const MajorCard: React.FC<MajorCardProps> = ({
  image, name, capped, degreeType, description, departments, links, specializations, note,
}) => {
  // Array of tags for the major
  const tags: Tag[] = [];

  // Add "Capped" tag if the major is capped
  if (capped) tags.push({ name: 'Capped', color: tagColorMap.Capped });

  // Add degree type tag with corresponding color
  if (degreeType) {
    /* Update the following line to add additional colors
    based on new bachelor degrees in the future */
    const color = degreeType === 'Bachelor of Arts'
      ? tagColorMap['Bachelor of Art (BA)']
      : tagColorMap['Bachelor of Science (BS)'];
    tags.push({ name: degreeType, color });
  }

  return (
    <>
      {/* Anchor for linking directly to this major */}
      <div id={name && name.replace(/\s/g, '-')} className="major-hyperlink" />
      
      {/* Main container for the MajorCard */}
      <div className="major-card">
        {/* Display the major's image */}
        {image && <img className="major-card-photo" src={image} alt={`${name || 'Major Card'}`} />}
        
        {/* Top section with the major's name and tags */}
        <div className="major-card-top">
          {name && <p className="major-card-heading">{name}</p>}
          {(capped || degreeType) && (
            <div className="major-card-tags">
              {tags.map((tag, index) => (
                <p key={index} className={`major-card-tag ${tag.color}`}>{tag.name}</p>
              ))}
            </div>
          )}
        </div>

        {/* Bottom section with the major's description, departments, and links */}
        <div className="major-card-bottom">
          <div className="major-card-info">
            {/* Left column: description of the major */}
            <div className="major-card-info-left">
              <p className="major-card-subheading">Description</p>
              {description && <p className="major-card-description">{description}</p>}
            </div>
            
            {/* Right column: departments and additional links */}
            <div className="major-card-info-right">
              <p className="major-card-subheading">Departments</p>
              <div className="major-card-links">
                {departments && departments.map((department, index) =>
                  department.title && department.url && (
                    <a className="major-card-link" target="_blank" rel="noopener noreferrer" 
                       href={department.url} key={index}>
                      {department.title}
                      <img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" />
                    </a>
                  )
                )}
              </div>
              <div className="major-card-links">
                <p className="major-card-subheading">More Information</p>
                {links && links.map((link, index) =>
                  link.title && link.url && (
                    <a className="major-card-link" target="_blank" rel="noopener noreferrer" 
                       href={link.url} key={index}>
                      {link.title}
                      <img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Expandable sections for specializations */}
          {specializations.length !== 0 && (specializations.map((specialization, index) => {
            const [open, setOpen] = useState<boolean>(false); // State for toggling specialization details

            return (
              <div className="major-card-specialization" key={index}>
                <div className="major-card-specialization-heading" onClick={() => setOpen(!open)}>
                  <p className="major-card-specialization-name">{specialization.name}</p>
                  <button className={`major-card-specialization-button ${open ? 'open' : ''}`} 
                          type="button">
                    <img src={Caret} alt="Description" />
                  </button>
                </div>
                <div className={`major-card-specialization-content ${open ? 'open' : ''}`}>
                  <p className="major-card-specialization-detail">{specialization.detail}</p>
                </div>
              </div>
            );
          })
          )}

          {/* Additional notes section */}
          {note && (
            <div className="major-card-note">
              <p className="major-card-note-text">{note}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MajorCard;
