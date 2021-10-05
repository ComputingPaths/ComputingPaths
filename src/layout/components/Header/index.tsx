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
        <Link to="/">
          <img className="header-logo" src="/img/logo-dark.png" alt="Dark Logo" />
        </Link>
        <div className="header-links">
          {pages.map((page, index) => (<Link to={page.link} key={index}><p className="header-link" key={index}>{page.title}</p></Link>))}
        </div>
        <div className="header-mobile">
          <button className="header-mobile-button" type="button" onClick={() => setMenu(!menu)}><img className="header-mobile-icon" src={HeaderMenu} alt="Mobile Menu" /></button>
        </div>
        <div className={`header-mobile-links${menu ? ' open' : ''}`}>
          {pages.map((page, index) => (<Link to={page.link} key={index}><p className="header-link">{page.title}</p></Link>))}
        </div>
      </div>
      {heroURL && <img className="hero" src={heroURL} alt="Page Hero Divider" />}
    </>
  );
};

export default Header;
