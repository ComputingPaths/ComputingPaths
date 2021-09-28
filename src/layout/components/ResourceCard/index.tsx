import React from 'react';

import './style.scss';

interface ResourceCardProps {
    photoURL?: string;
    title?: string;
    tags?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  photoURL,
  title,
  tags,
}) => (
  <div className="resource-card">
    {photoURL && <img className="resource-card-image" src={photoURL} alt={title} />}
    <div className="resource-card-content">
      {title && <p className="resource-card-title">{title}</p>}
      {tags && <div className="resource-card-tags">{tags.split(',').map((tag) => <p className="resource-card-tag">{tag}</p>)}</div>}
    </div>
  </div>
);

export default ResourceCard;
