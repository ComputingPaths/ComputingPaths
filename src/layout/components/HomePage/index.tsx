import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const HomePage: React.FC = () => {
  const data = useData(DataTypes.Majors);

  return (
    <main className="home-page">
      <h1 className="home-page-title">Discover Your Path in Computing</h1>
      <h2 className="home-page-subheader major">The Majors</h2>
      <section className="home-page-majors-container">
        <div className="home-page-majors-section">
          <p className="home-page-majors-section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <h3 className="home-page-majors-section-major">Bioinformatics</h3>
        </div>
        <div className="home-page-majors-section">
          <p className="home-page-majors-section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p className="home-page-majors-section-major">Cognitive Science</p>
        </div>
        <div className="home-page-majors-section">
          <p className="home-page-majors-section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p className="home-page-majors-section-major">Computer Science</p>
        </div>
      </section>
      <section>
        <p className="home-page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>
      <h2 className="home-page-subheader">Clubs</h2>
      <h2 className="home-page-subheader">Projects</h2>
      <h2 className="home-page-subheader">Labs</h2>
      {data.map((major) => <h1>{major.Name}</h1>)}
    </main>
  );
};

export default HomePage;
