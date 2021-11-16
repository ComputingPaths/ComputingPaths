import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CarouselRightArrow from '../../../assets/CarouselRightArrow.svg';
import CarouselLeftArrow from '../../../assets/CarouselLeftArrow.svg';
import Gear from '../../../assets/Gear.svg';
import LeftQuote from '../../../assets/LeftQuote.svg';
import RightQuote from '../../../assets/RightQuote.svg';
import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const HomePage: React.FC = () => {
  const [majors, setMajor] = useState<Array<any>>([]);
  const [homeData, setHomeData] = useState<Array<any>>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNav = () => {
    if (menuRef && menuRef.current) {
      const widthOfItem = (menuRef.current.childNodes[0] as HTMLDivElement).clientWidth;
      menuRef.current.scrollLeft += widthOfItem;
    }
  };

  useEffect(() => {
    useData(DataTypes.Majors)
      .then((newData) => setMajor(newData))
      .catch(() => setMajor([]));
    useData(DataTypes.Home)
      .then((newData) => setHomeData(newData))
      .catch(() => setHomeData([]));
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
        <img className="home-page-image" src="/img/HomePageLogo.svg" alt="home page logo" />
      </section>
      <h2 className="home-page-header major">Majors</h2>
      <button className="home-page-left-arrow" type="submit" onClick={handleNav}>
        <img src={CarouselLeftArrow} alt="Left Arrow" />
      </button>
      <section className="home-page-majors-container" ref={menuRef}>
        {majors.concat(majors[0] || []).map((major) => (
          <div className="home-page-majors-section">
            <img className="home-page-majors-section-image" src={major.image} alt="major" />
            <h3 className="home-page-majors-section-major">{major.name}</h3>
          </div>
        ))}
      </section>
      <button className="home-page-right-arrow" type="submit" onClick={handleNav}>
        <img src={CarouselRightArrow} alt="Right Arrow" />
      </button>
      <article className="home-page-stories-section">
        <h2 className="home-page-header">Stories &#38; Advice</h2>
        <section className="home-page-stories">
          <div className="home-page-stories-image">
            <img className="home-page-stories-gear" src={Gear} alt="Gear Quote" />
            <img className="home-page-image-circle" src={homeData.length > 0 ? homeData[0].story_photo : null} alt="Advice" />
          </div>
          <div className="home-page-stories-text">
            <img className="home-page-stories-left-quote" src={LeftQuote} alt="Left Quote" />
            <p className="home-page-stories-quote">{homeData.length > 0 ? homeData[0].story_quote : null}</p>
            <h3 className="home-page-stories-name">
              {homeData.length > 0 ? homeData[0].story_name : null} &nbsp;
              <span>{homeData.length > 0 ? homeData[0].story_bio : null}</span>
            </h3>
            <img className="home-page-stories-right-quote" src={RightQuote} alt="Right Quote" />
          </div>
        </section>
      </article>
      <h2 className="home-page-header">Get Involved</h2>
      <section className="home-page-resources">
        <img className="home-page-involed-image" src={homeData.length > 0 ? homeData[0].student_org_photo : null} alt="org logo" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Student Organizations</h2>
          <p className="home-page-text">Student Organizations allow for extracurricular expierence, utilizing and extending skills imparted in computing courses. These groups demonstrate creating computing efforts by channeling the collaborative spirit of UC San Diego.</p>
          <Link className="home-page-links" to="/organizations">
            <button className="home-page-home-button" type="submit">Learn More</button>
          </Link>
        </div>
      </section>
      <section className="home-page-resources">
        <img className="home-page-involed-image" src={homeData.length > 0 ? homeData[0].projects_photo : null} alt="projects logo" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Projects</h2>
          <p className="home-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
          <Link className="home-page-links" to="/projects">
            <button className="home-page-home-button" type="submit">See Projects</button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
