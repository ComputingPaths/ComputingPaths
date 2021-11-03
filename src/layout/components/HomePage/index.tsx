import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Gear from '../../../assets/Gear.svg';
import LeftQuote from '../../../assets/LeftQuote.svg';
import RightQuote from '../../../assets/RightQuote.svg';
import { DataTypes, useData } from '../../../utils/data';
import './style.scss';

const HomePage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Departments)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);

  return (
    <main className="home-page">
      <h1 className="home-page-title">Discover Your Path in Computing</h1>
      <Link to="/organizations">
        <button className="home-page-home-button" type="submit">Find Your Home</button>
      </Link>
      <h2 className="home-page-header major">The Majors</h2>
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
      <article className="home-page-stories-section">
        <h2 className="home-page-header">Stories &#38; Advice</h2>
        <section className="home-page-stories">
          <div className="home-page-stories-image">
            <img className="home-page-stories-gear" src={Gear} alt="Gear Quote" />
            <img className="home-page-image-circle" src="/img/story.jpg" alt="Advice" />
          </div>
          <div className="home-page-stories-text">
            <img className="home-page-stories-left-quote" src={LeftQuote} alt="Left Quote" />
            <p className="home-page-stories-quote">What sealed the deal on software engineering for me was that rush you get when something finally works</p>
            <h3 className="home-page-stories-name">
              Rachel Keirouz &nbsp;
              <span>Mathematics - Computer Science</span>
            </h3>
            <img className="home-page-stories-right-quote" src={RightQuote} alt="Right Quote" />
          </div>
        </section>
      </article>
      <h2 className="home-page-header">Get Involved</h2>
      <section className="home-page-resources">
        <div className="home-page-image" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Student Organizations</h2>
          <p className="home-page-text">Student Organizations allow for extracurricular expierence, utilizing and extending skills imparted in computing courses. These groups demonstrate creating computing efforts by channeling the collaborative spirit of UC San Diego.</p>
          <Link to="/organizations">
            <button className="home-page-home-button" type="submit">Learn More</button>
          </Link>
        </div>
      </section>
      <section className="home-page-resources">
        <div className="home-page-image" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Projects</h2>
          <p className="home-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
          <Link to="/projects">
            <button className="home-page-home-button" type="submit">See Projects</button>
          </Link>
        </div>
      </section>
      {data.map((major) => <h1>{major.Name}</h1>)}
    </main>
  );
};

export default HomePage;
