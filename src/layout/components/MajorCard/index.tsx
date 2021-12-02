import React, { useState } from 'react';

import LinkedArrow from '../../../assets/LinkedArrow.svg';
import Caret from '../../../assets/caret.svg';

import './style.scss';

interface MajorCardProps {
    image: string;
    name: string;
    capped: boolean;
    degreeType: string;
    description: string;
    departments: { title: string; url: string; }[];
    links: { title: string; url: string }[];
    specializations: { name: string, detail: string }[];
    note: string;
}

const MajorCard: React.FC<MajorCardProps> = ({
  image, name, capped, degreeType, description, departments, links, specializations, note,
}) => {
  const [open, setOpen] = useState(-1);
  return (
    <>
      <div id={name && name.replace(/\s/g, '-')} className="major-hyperlink" />
      <div className="major-card">
        {image && <img className="major-card-photo" src={image} alt={`${name || 'Major Card'}`} />}
        <div className="major-card-top">
          {name && <p className="major-card-heading">{name}</p>}
          {(capped || degreeType) && (
          <div className="major-card-tags">
            {capped && <p className="major-card-tag">Capped</p>}
            {degreeType && <p className="major-card-tag">{degreeType}</p>}
          </div>
          )}
        </div>
        <div className="major-card-middle">
          <div className="major-card-middle-left">
            <p className="major-card-subheading">Description</p>
            {description && <p className="major-card-description">{description}</p>}
          </div>
          <div className="major-card-middle-right">
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
        {specializations.length !== 0
      && (
      <div className="major-card-bottom">
        {specializations.map((specialization, index) => (
          <div className="major-card-specialization" key={index}>
            <div className="major-card-specialization-heading">
              <p className="major-card-specialization-name">{specialization.name}</p>
              <button className={`major-card-specialization-button ${open === index ? 'open' : ''}`} type="button" onClick={() => setOpen(open === index ? -1 : index)}><img src={Caret} alt="Description" /></button>
            </div>
            <div className={`major-card-specialization-content ${open === index ? 'open' : ''}`}>
              <p className="major-card-specialization-detail">{specialization.detail}</p>
            </div>
          </div>
        ))}
      </div>
      )}
        {note && (
        <div className="major-card-note">
          <p className="major-card-note-text">{note}</p>
        </div>
        )}
      </div>
    </>
  );
};

export default MajorCard;
