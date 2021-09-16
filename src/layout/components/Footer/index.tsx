import React from 'react';

import './style.scss';

const Footer: React.FC = () => {
  const pages = [
    { title: 'Stories', link: '/stories' }, { title: 'Majors', link: '/majors' },
    { title: 'Student Organizations', link: '/organizations' },
    { title: 'Projects', link: '/projects' },
    { title: 'Resources', link: '/resources' },
  ];

  return (
    <div className="footer">
      <div className="footer-content">
        <img className="footer-logo" src="/img/logo_ucsd.png" alt="UCSD Logo" />
        <p className="footer-contact">Contact</p>
        <a href="mailto:computingpaths@eng.ucsd.edu"><p className="footer-email">computingpaths@eng.ucsd.edu</p></a>
      </div>
      <div className="footer-links">
        {pages.map((page) => (<a className="footer-link" href={page.link}>{page.title}</a>))}
      </div>
    </div>
  );
};

export default Footer;
