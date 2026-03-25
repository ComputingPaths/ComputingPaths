// File: Header/index.tsx
// This file defines the Header component, which is the navigation bar
// for the "Computing Paths" website.
// The header includes a logo, navigation links for desktop and
// mobile views, and an optional hero image.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from '../../../assets/HeaderMenu.svg';
import { pages } from '../../../vars';

import './style.scss';

interface HeaderProps {
  heroURL?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { heroURL } = props;
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <>
      <div className="header">
        <div className="header-content">
          <Link to="/" className="header-logo-link">
            <img
              className="header-logo"
              src="/img/logo-dark.webp"
              alt="ComputingPaths logo"
              width="166"
              height="32"
            />
          </Link>

          <div className="header-links">
            {pages.map((page, index) => (
              <Link to={page.link} className="header-link" key={index}>
                {page.title}
              </Link>
            ))}
          </div>

          <div className="header-mobile">
            <button
              className="header-mobile-button"
              type="button"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menu}
            >
              <img className="header-mobile-icon" src={HeaderMenu} alt="" />
            </button>
          </div>
        </div>

        <div className={`header-mobile-links${menu ? ' open' : ''}`}>
          {pages.map((page, index) => (
            <Link to={page.link} className="header-link" key={index}>
              {page.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="spacer" />
      {heroURL && <img className="hero" src={heroURL} alt="Page divider of heading and body content" />}
    </>
  );
};

export default Header;
