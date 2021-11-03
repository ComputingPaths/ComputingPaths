import React from 'react';

import LinkedinIcon from '../../../assets/linkedin-icon.svg';
import EmailIcon from '../../../assets/email-icon.svg';
import WebsiteIcon from '../../../assets/website-icon.svg';

import './style.scss';

type OrganizationCardProps = {
    name: string,
    img: string,
    tags: string[],
    link: string
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  name, img, tags, link,
}) => (
  <div className="org-card">
    <img className="org-card-logo" src={img} alt={name} />
    <div className="org-card-info">
      <h3>{name}</h3>
      <div className="org-card-tags">
        {tags?.length > 0 && tags?.map((tag) => (
          <span>{tag}</span>
        ))}
      </div>
      <div className="org-card-links">
        <a href="#">
          <img src={EmailIcon} alt="Email Icon" />
        </a>
        <a href={link}>
          <img src={WebsiteIcon} alt="Email Icon" />
        </a>
        <a href="#">
          <img src={LinkedinIcon} alt="Linkedin Icon" />
        </a>
      </div>
    </div>
  </div>
);

export default OrganizationCard;
