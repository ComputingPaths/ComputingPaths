import React from 'react';

import LinkedinIcon from '../../../assets/linkedin-icon.svg';
import EmailIcon from '../../../assets/email-icon.svg';
import WebsiteIcon from '../../../assets/website-icon.svg';

import './style.scss';

interface OrganizationCardProps {
    name: string,
    img: string,
    tags: ({ name: any; color: string; } | null)[],
    link: string,
    linkedin: string,
    email: string
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  name, img, tags, link, linkedin, email,
}) => (
  <div className="org-card">
    <img className="org-card-logo" src={img} alt={name} />
    <div className="org-card-info">
      <h3>{name}</h3>
      <div className="org-card-tags">
        {tags.map((tag) => (tag ? <p className={`org-card-tag ${tag.color}`}>{tag.name}</p> : null))}
      </div>
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
