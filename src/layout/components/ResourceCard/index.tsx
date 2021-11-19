import React, { useState } from 'react';

import LinkedArrow from '../../../assets/WhiteLinkedArrow.svg';
import XIcon from '../../../assets/x.svg';

import './style.scss';

interface ResourceCardProps {
    image: string;
    imageLink: string;
    name: string;
    tags: ({ name: any; color: string; } | null)[];
    link: string;
    description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  image, imageLink, name, tags, link, description,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="resource-card">
      <a target="_blank" rel="noopener noreferrer" href={imageLink}><img className="resource-card-image" src={image || '/img/CP Generic Icon.jpg'} alt={name} /></a>
      <div className={`resource-card-content${visible ? ' visible' : ''}`}>
        <div>
          <p className="resource-card-name">{name}</p>
          <div className="resource-card-tags">
            {tags.map((tag) => (tag ? <p className={`resource-card-tag ${tag.color}`}>{tag.name}</p> : null))}
          </div>
        </div>
        <button className="resource-card-view" type="button" onClick={() => setVisible(true)}>View More<img className="resource-card-view-arrow" src={LinkedArrow} alt="Arrow" /></button>
        <div className={`resource-card-hidden${visible ? ' visible' : ''}`}>
          <button className="resource-card-button" type="button" onClick={() => setVisible(false)}>
            <img src={XIcon} alt="X" />
          </button>
          <p className="resource-card-description">{description}</p>
          <a target="_blank" rel="noopener noreferrer" href={link}><p className="resource-card-link">Learn More<img className="resource-card-view-arrow" src={LinkedArrow} alt="Arrow" /></p></a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
