// File: Header/index.tsx
// This file defines the Header component, which is the navigation bar
// for the "Computing Paths" website.
// The header includes a logo, navigation links for desktop and
// mobile views, and an optional hero image.

import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false);
      }
    };

    if (menu) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menu]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="header">
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

          <nav className="header-links" aria-label="Primary">
            {pages.map((page, index) => (
              <Link to={page.link} className="header-link" key={index}>
                {page.title}
              </Link>
            ))}
          </nav>

          <div className="header-mobile">
            <button
              className="header-mobile-button"
              type="button"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menu}
              aria-controls="header-mobile-links"
            >
              <img className="header-mobile-icon" src={HeaderMenu} alt="" />
            </button>
          </div>
        </div>

        <nav
          id="header-mobile-links"
          className={`header-mobile-links${menu ? ' open' : ''}`}
          aria-label="Primary"
          aria-hidden={!menu}
        >
          {pages.map((page, index) => (
            <Link to={page.link} className="header-link" key={index} tabIndex={menu ? 0 : -1}>
              {page.title}
            </Link>
          ))}
        </nav>
      </header>

      <div className="spacer" />
      {heroURL && <img className="hero" src={heroURL} alt="Page divider of heading and body content" />}
    </>
  );
};

export default Header;
