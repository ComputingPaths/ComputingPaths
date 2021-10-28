import React from 'react';

import ExpandArrow from '../../../assets/ExpandArrow.svg';

import './style.scss';

interface ResourceCardProps {
    description: string;
    organization: string;
    photoURL: string;
    resourceLink: string;
    resourceMembers: string;
    resourceName: string;
    resourceTag: string;
    videoURL: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  organization,
  photoURL,
  resourceName,
  resourceTag,
}) => (
  <div className="resource-card">
    {photoURL && <img className="resource-card-photo" src={photoURL.split(',')[0]} alt={`${resourceName || 'Resource Card'}`} />}
    <p className="resource-card-section">
      <h2 className="resource-card-heading">{resourceName}</h2>
      <h2 className="resource-card-organization">{organization}</h2>
      <span className={`resource-card-resource-tag ${resourceTag.toLowerCase()}`}>{resourceTag}</span>
      <img className="resource-card-expand-arrow" src={ExpandArrow} alt="Expand Arrow" />
    </p>
  </div>
);

export default ResourceCard;
