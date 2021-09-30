import React from 'react';

import LinkedArrow from '../../../assets/LinkedArrow.svg';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

interface MajorCardProps {
    majorText?: string;
    capped?: boolean;
    degreeText?: string;
    departments?: string[];
    majorDescription?: string;
    linkText?: string;
    linkURL?: string;
    photoURL?: string;
}

const MajorCard: React.FC<MajorCardProps> = ({
  majorText,
  capped,
  degreeText,
  departments,
  majorDescription,
  linkText,
  linkURL,
  photoURL,
}) => {
  const departmentData = useData(DataTypes.Departments);
  const departmentURLs = new Map();

  departmentData.forEach((department) => {
    departmentURLs.set(department.Name, department.Link);
  });

  return (
    <div className="major-card" id={majorText && majorText.replace(/\s/g, '-')}>
      {photoURL && <img className="major-card-photo" src={photoURL} alt={`${majorText || 'Major Card'}`} />}
      <div className="major-card-top">
        {majorText && <p className="major-card-heading">{majorText}</p>}
        {capped && <p className="major-card-tag">Capped</p>}
        {degreeText && <p className="major-card-tag">{degreeText}</p>}
      </div>
      <div className="major-card-bottom">
        <div className="major-card-bottom-left">
          <p className="major-card-subheading">Description</p>
          {majorDescription && <p className="major-card-description">{majorDescription}</p>}
        </div>
        <div className="major-card-bottom-right">
          <p className="major-card-subheading">Departments</p>
          <div className="major-card-links">
            {departments && departments.map((department) => (
              <a className="major-card-link" target="_blank" rel="noopener noreferrer" href={departmentURLs[department]}>{department}<img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
            ))}
          </div>
          <div className="major-card-links">
            <p className="major-card-subheading">More Information</p>
            <a style={{ textDecoration: 'underline' }} className="major-card-link" target="_blank" rel="noopener noreferrer" href={linkURL}>{linkText}<img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
