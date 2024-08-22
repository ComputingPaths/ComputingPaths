// File: OrganizationCard/index.tsx
// This component renders a card displaying information about a
// student organization, including its name, logo, tags, and
// contact links such as email, website, and LinkedIn.

import React from 'react';

import LinkedinIcon from '../../../assets/linkedin-icon.svg';
import EmailIcon from '../../../assets/email-icon.svg';
import WebsiteIcon from '../../../assets/website-icon.svg';

import './style.scss';

// Interface for the props of OrganizationCard
interface OrganizationCardProps {
    name: string; // Name of the organization
    img: string; // URL of the organization's logo image
    tags: ({ name: any; color: string; } | null)[]; // Array of tags with name and color
    link: string; // URL to the organization's website
    linkedin: string; // URL to the organization's LinkedIn page
    email: string; // Email address for contacting the organization
}

// OrganizationCard component renders a card with the organization's logo,
// name, tags, and links.
const OrganizationCard: React.FC<OrganizationCardProps> = ({
  name, img, tags, link, linkedin, email,
}) => (
  <div className="org-card">
    {/* Display the organization's logo */}
    <img className="org-card-logo" src={img} alt={name} />
    <div className="org-card-info">
      <h3>{name}</h3>
      {/* Display tags associated with the organization */}
      <div className="org-card-tags">
        {tags.map((tag) => (tag ? <p className={`org-card-tag ${tag.color}`}>{tag.name}</p> : null))}
      </div>
      {/* Display contact links: email, website, and LinkedIn */}
      <div className="org-card-links">
        {email && (
        <a href={`mailto:${email}`}>
          <img src={EmailIcon} alt="Email Icon" />
        </a>
        )}
        {link && (
        <a href={link}>
          <img src={WebsiteIcon} alt="Email Icon" />
        </a>
        )}
        {linkedin && (
        <a href={linkedin}>
          <img src={LinkedinIcon} alt="Linkedin Icon" />
        </a>
        )}
      </div>
    </div>
  </div>
);

export default OrganizationCard;
