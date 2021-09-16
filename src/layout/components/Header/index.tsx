import React from 'react';

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
        <a href="/">
          <img className="header-logo" src="/img/logo-dark.png" alt="Dark Logo" />
        </a>
        <div className="header-links">
          {pages.map((page) => (<a className="header-link" href={page.link}>{page.title}</a>))}
        </div>
      </div>
      {heroURL && <img className="hero" src={heroURL} alt="Page Hero Divider" />}
    </>
  );
};

export default Header;
