import React from 'react';

import RightArrow from '../../../assets/RightArrow.svg';

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
      <section className="home-page-stories">
        <h2 className="">Stories &#38; Majors</h2>
        <p className="">What sealed the deal on software engineering for me was that rush you get when something finally works</p>
        <h3 className="">Rachel Keirouz | Mathematics - Computer Science</h3>
        <h3 className="">Read their stories <a className="home-page-link" target="_self" rel="noopener noreferrer" href="/stories"><img className="home-page-link-arrow" src={RightArrow} alt="Right Arrow" /></a></h3>
      </section>
      <section className="home-page-resources">
        <div className="home-page-image" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Student Organizations</h2>
          <p className="home-page-text">Student Organizations allow for extracurricular expierence, utilizing and extending skills imparted in computing courses. These groups demonstrate creating computing efforts by channeling the collaborative spirit of UC San Diego.</p>
          <span className="home-page-tags">Get Involved!</span>
        </div>
      </section>
      <section className="home-page-resources">
        <div className="home-page-image" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Projects</h2>
          <p className="home-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
          <span className="home-page-tags">Get Projects!</span>
        </div>
      </section>
      <section className="home-page-resources">
        <div className="home-page-image" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Labs</h2>
          <p className="home-page-text">The labs at UC San Diego are solving major societal issues, such as large-scale education, automation, healthcare, visualization of complex phenomena and data, social interactions, citizen science, and the ethical issues that are of ever-increasing importance.</p>
          <span className="home-page-tags">Learn More!</span>
        </div>
      </section>
      {data.map((major) => <h1>{major.Name}</h1>)}
    </main>
  );
};

export default HomePage;
