// File: MajorCard/index.tsx
// This file defines the MajorCard component, which displays details about a
// specific major, including its description, departments, links,
// specializations, and tags like whether it's selective (previously capped) or its degree type.

import React, { useState } from 'react';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import Caret from '../../../assets/caret.svg';
import './style.scss';

// Interface defining the props for the MajorCard component
interface MajorCardProps {
    image: string;
    name: string;
    selective: boolean;
    degreeType: string;
    description: string;
    departments: { title: string; url: string; }[];
    links: { title: string; url: string }[];
    specializations: { name: string, detail: string }[];
    note: string;
}

// Interface for tags representing the major's attributes
interface Tag {
  name: string;
  color: string;
}

// Mapping degree types and other attributes to specific colors for tags
const tagColorMap: { [key: string]: string } = {
  /* Add new colors for new bachelor degrees here in the future.
  Refer to color list in ../styles/_vars.scss */
  Selective: 'light-yellow',
  'Bachelor of Art (BA)': 'light-blue',
  'Bachelor of Science (BS)': 'mint',
};

// MajorCard component renders details about a major, including its image,
// description, departments, links, and specializations.
const MajorCard: React.FC<MajorCardProps> = ({
  image, name, selective, degreeType, description, departments, links, specializations, note,
}) => {
  const tags: Tag[] = [];
  // Add "Selective" tag if the major is selective
  if (selective) tags.push({ name: 'Selective', color: tagColorMap.Selective });
  // Add degree type tag with corresponding color
  if (degreeType) {
    /* Change line of code below to add additional colors
    based on new bachelor degrees in the future */
    const color = degreeType === 'Bachelor of Arts' ? tagColorMap['Bachelor of Art (BA)'] : tagColorMap['Bachelor of Science (BS)'];
    tags.push({ name: degreeType, color });
  }

  return (
    <>
      <div id={name && name.replace(/\s/g, '-')} className="major-hyperlink" />
      {/* Main container for the MajorCard */}
      <div className="major-card">
        {image && <img className="major-card-photo" src={image} alt={`${name || 'Major Card'}`} />}
        {/* Top section with the major's name and tags */}
        <div className="major-card-top">
          {name && <p className="major-card-heading">{name}</p>}
          {(selective || degreeType) && (
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
            <div className="major-card-info-left">
              <p className="major-card-subheading">Description</p>
              {description && <p className="major-card-description">{description}</p>}
            </div>
            <div className="major-card-info-right">
              <p className="major-card-subheading">Departments</p>
              <div className="major-card-links">
                {departments && departments.map((department, index) => department.title && department.url && <a className="major-card-link" target="_blank" rel="noopener noreferrer" href={department.url} key={index}>{department.title}<img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>)}
              </div>
              <div className="major-card-links">
                <p className="major-card-subheading">More Information</p>
                {links && links.map((link, index) => link.title && link.url && <a className="major-card-link" target="_blank" rel="noopener noreferrer" href={link.url} key={index}>{link.title}<img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>)}
              </div>
            </div>
          </div>

          {/* Expandable sections for specializations */}
          {specializations.length !== 0 && (specializations.map((specialization, index) => {
            const [open, setOpen] = useState<boolean>(false);

            return (
              <div className="major-card-specialization" key={index}>
                <div className="major-card-specialization-heading" onClick={() => setOpen(!open)}>
                  <p className="major-card-specialization-name">{specialization.name}</p>
                  <button className={`major-card-specialization-button ${open ? 'open' : ''}`} type="button"><img src={Caret} alt="Description" /></button>
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
