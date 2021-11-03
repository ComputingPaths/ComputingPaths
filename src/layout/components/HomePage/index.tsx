import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CarouselRightArrow from '../../../assets/CarouselRightArrow.svg';
import Gear from '../../../assets/Gear.svg';
import LeftQuote from '../../../assets/LeftQuote.svg';
import RightQuote from '../../../assets/RightQuote.svg';
import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const HomePage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Majors)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);

  return (
    <main className="home-page">
      <section className="home-page-landing">
        <div className="home-page-title-section">
          <h1 className="home-page-title">Discover Your Path in Computing</h1>
          <Link to="/organizations">
            <button className="home-page-home-button" type="submit">Find Your Home</button>
          </Link>
        </div>
        <div className="home-page-image" />
      </section>
      <h2 className="home-page-header major">Majors</h2>
      <section className="home-page-majors-container">
        {data.map((major) => (
          <div className="home-page-majors-section">
            <img className="home-page-majors-section-image" src={major.Image} alt="major" />
            <h3 className="home-page-majors-section-major">{major.Name}</h3>
          </div>
        ))}
      </section>
      <img className="home-page-right-arrow" src={CarouselRightArrow} alt="Right Arrow" />
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
    </main>
  );
};

export default HomePage;
