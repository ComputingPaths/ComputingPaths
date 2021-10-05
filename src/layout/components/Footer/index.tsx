import React from 'react';
import { Link } from 'react-router-dom';

import { pages } from '../../../vars';

import './style.scss';

const Footer: React.FC = () => (
  <div className="footer">
    <div className="footer-content">
      <img className="footer-logo" src="/img/logo_ucsd.png" alt="UCSD Logo" />
      <p className="footer-contact">Contact</p>
      <a href="mailto:computingpaths@eng.ucsd.edu"><p className="footer-email">computingpaths@eng.ucsd.edu</p></a>
    </div>
    <div className="footer-links">
      {pages.map((page, index) => (<Link to={page.link}><p className="footer-link" key={index}>{page.title}</p></Link>))}
    </div>
    <div className="footer-issue">
      <p className="footer-issue-heading">Have an issue?</p>
      <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/xKkMgde4E9p8Pmoo6"><p className="footer-issue-link">Fill out this form</p></a>
    </div>
  </div>
);

export default Footer;
