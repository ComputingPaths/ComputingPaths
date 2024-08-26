// File: Footer/index.tsx
// This file defines the Footer component, which is displayed at the bottom
// of each page on the "Computing Paths" website.
// The footer includes the UCSD logo, contact information, navigation links
// to different pages, and a link to report issues.import React from 'react'

import React from 'react';

import { Link } from 'react-router-dom';

import { pages } from '../../../vars';

import './style.scss';

// The Footer component is a functional component that renders the website's footer.
// It includes a logo, contact email, navigation links, and a form link for reporting issues.
const Footer: React.FC = () => (
  <div className="footer">
    <div className="footer-content">
      <img className="footer-logo" src="/img/logo_ucsd.webp" alt="UCSD Logo" width="166px" height="32px" />
      <p className="footer-contact">Contact</p>
      <a href="mailto:computingpaths@ucsd.edu"><p className="footer-email">computingpaths@ucsd.edu</p></a>
    </div>
    <div className="footer-links">
      {pages.map((page, index) => (<Link to={page.link} key={index}><p className="footer-link">{page.title}</p></Link>))}
    </div>
    <div className="footer-issue">
      <p className="footer-issue-heading">Have an issue?</p>
      <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/Sosw6WvxEupsz1Sx6"><p className="footer-issue-link">Fill out this form</p></a>
    </div>
  </div>
);

export default Footer;
