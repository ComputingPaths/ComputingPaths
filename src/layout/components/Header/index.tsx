import React from 'react';
import { Link } from 'react-router-dom';

import { pages } from '../../../vars';

import './style.scss';

interface HeaderProps {
    heroURL?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { heroURL } = props;

  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="header-logo" src="/img/logo-dark.png" alt="Dark Logo" />
        </Link>
        <div className="header-links">
          {pages.map((page, index) => (<Link to={page.link}><p className="header-link" key={index}>{page.title}</p></Link>))}
        </div>
      </div>
      {heroURL && <img className="hero" src={heroURL} alt="Page Hero Divider" />}
    </>
  );
};

export default Header;
