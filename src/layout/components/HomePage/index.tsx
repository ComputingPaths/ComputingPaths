import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CarouselRightArrow from '../../../assets/CarouselRightArrow.svg';
import CarouselLeftArrow from '../../../assets/CarouselLeftArrow.svg';
import Gear from '../../../assets/Gear.svg';
import LeftQuote from '../../../assets/LeftQuote.svg';
import RightQuote from '../../../assets/RightQuote.svg';

import { parseLookup } from '../../../utils/funcs';
import {
  DataTypes, Home, Majors, Stories, useData,
} from '../../../utils/data';

import './style.scss';

interface HomePageProps {
  heroURL: string;
}

const HomePage: React.FC<HomePageProps> = ({ heroURL }) => {
  const [majors, setMajor] = useState<Array<Majors>>([]);
  const [homeData, setHomeData] = useState<Home>({
    student_org_photo: '',
    projects_photo: '',
    featured_story: '',
  });
  const [stories, setStories] = useState<Array<Stories>>([]);

  const storyLookup = parseLookup(stories, 'name');

  const menuRef = useRef<HTMLDivElement>(null);

  const handleNav = (event) => {
    if (menuRef && menuRef.current) {
      const widthOfItem = (menuRef.current.childNodes[0] as HTMLDivElement).clientWidth;
      if (event.target.className.includes('home-page-left-arrow')) {
        menuRef.current.scrollLeft -= widthOfItem;
      } else {
        menuRef.current.scrollLeft += widthOfItem;
      }
    }
  };

  useEffect(() => {
    useData(DataTypes.Majors)
      .then((newData) => setMajor(newData))
      .catch(() => setMajor([]));

    useData(DataTypes.Home)
      .then((newData) => setHomeData(newData[0] || {}))
      .catch(() => setHomeData({
        student_org_photo: '',
        projects_photo: '',
        featured_story: '',
      }));

    useData(DataTypes.Stories)
      .then((newData) => setStories(newData))
      .catch(() => setStories([]));
  }, [useData]);

  const story = storyLookup.get(homeData.featured_story);

  return (
    <main className="home-page">
      <section className="home-page-landing">
        <div className="home-page-title-section">
          <h1 className="home-page-title">Discover Your Path in Computing</h1>
          <Link to="/organizations">
            <button className="home-page-home-button" type="submit">Find Your Home</button>
          </Link>
        </div>
        <img className="home-page-image" src={heroURL} alt="home page logo" />
      </section>
      <h2 className="home-page-header major">Majors</h2>
      <section className="home-page-majors-container" ref={menuRef}>
        {majors.map((major) => (
          <Link to={`/majors#${major.name.replace(/\s/g, '-')}`} className="home-page-majors-section">
            <img className="home-page-majors-section-image" src={major.image} alt="major" />
            <h3 className="home-page-majors-section-major">{major.name}</h3>
          </Link>
        ))}
      </section>
      <button className="home-page-left-arrow" type="submit" onClick={handleNav}>
        <img className="home-page-left-arrow-button" src={CarouselLeftArrow} alt="Left Arrow" />
      </button>
      <button className="home-page-right-arrow" type="submit" onClick={handleNav}>
        <img className="home-page-right-arrow-button" src={CarouselRightArrow} alt="Right Arrow" />
      </button>
      <article className="home-page-stories-section">
        <h2 className="home-page-header">Stories &#38; Advice</h2>
        {story && (
        <section className="home-page-stories">
          <div className="home-page-stories-image">
            <img className="home-page-stories-gear" src={Gear} alt="Gear Quote" />
            <img className="home-page-image-circle" src={stories.length > 0 ? story.image : null} alt="Advice" />
          </div>
          <div className="home-page-stories-text">
            <img className="home-page-stories-left-quote" src={LeftQuote} alt="Left Quote" />
            <p className="home-page-stories-quote">{story.highlighted_quote}</p>
            <h3 className="home-page-stories-name">
              {story.name} &nbsp;
              <span>{`${story.role ? `${story.role}` : ''}${story.role && story.class ? ' | ' : ''}${story.class ? `Class of ${story.class}` : ''}`}</span>
            </h3>
            <img className="home-page-stories-right-quote" src={RightQuote} alt="Right Quote" />
            <Link className="home-page-links" to="/stories">
              <button className="home-page-home-button" type="submit">Read More</button>
            </Link>
          </div>
        </section>
        )}
      </article>
      <h2 className="home-page-header">Get Involved</h2>
      <section className="home-page-resources">
        <img className="home-page-involed-image" src={homeData.student_org_photo} alt="org logo" />
        <div className="home-page-resources-section">
          <h2 className="home-page-subheader">Student Organizations</h2>
          <p className="home-page-text">Student Organizations allow for extracurricular expierence, utilizing and extending skills imparted in computing courses. These groups demonstrate creating computing efforts by channeling the collaborative spirit of UC San Diego.</p>
          <Link className="home-page-links" to="/organizations">
            <button className="home-page-home-button" type="submit">Learn More</button>
          </Link>
        </div>
      </section>
      <section className="home-page-resources">
        <img className="home-page-involed-image" src={homeData.projects_photo} alt="projects logo" />
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
