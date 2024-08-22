// File: ResourceCard/index.tsx
// This component renders a card displaying a resource with an image, name, tags, description,
// and a link to learn more. The card includes a "View More" button that reveals additional
// details when clicked.

import React, { useState } from 'react';

import LinkedArrow from '../../../assets/WhiteLinkedArrow.svg';
import XIcon from '../../../assets/x.svg';

import './style.scss';

// Interface for the props of ResourceCard
interface ResourceCardProps {
    image: string; // URL of the resource's image
    imageLink: string; // Link associated with the image
    name: string; // Name of the resource
    tags: ({ name: any; color: string; } | null)[]; // Tags related to the resource
    link: string; // URL to learn more about the resource
    description: string; // Description of the resource
}

// ResourceCard component renders a card with resource details, including an image,
// name, tags, and a "View More" button to reveal additional details.
const ResourceCard: React.FC<ResourceCardProps> = ({
  image, imageLink, name, tags, link, description,
}) => {
  // State to control visibility of extra content
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="resource-card">
      {/* Display the resource image with a link */}
      <a target="_blank" rel="noopener noreferrer" href={imageLink}><img className="resource-card-image" src={image || '/img/CP Generic Icon.jpg'} alt={name} /></a>
      {/* Content section with name, tags, and view more button */}
      <div className={`resource-card-content${visible ? ' visible' : ''}`}>
        <div>
          <p className="resource-card-name">{name}</p>
          <div className="resource-card-tags">
            {tags.map((tag) => (tag ? <p className={`resource-card-tag ${tag.color}`}>{tag.name}</p> : null))}
          </div>
        </div>
        <button className="resource-card-view" type="button" onClick={() => setVisible(true)}>View More<img className="resource-card-view-arrow" src={LinkedArrow} alt="Arrow" /></button>
        {/* Hidden section revealed on click, showing description and learn more link */}
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
