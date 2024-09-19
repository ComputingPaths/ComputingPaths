// File: HomePage/index.tsx
// This file defines the HomePage component, which is the main landing page
// for the "Computing Paths" website.
// The homepage includes sections for majors, stories and advice,
// student organizations, and projects.
// The content is dynamically fetched using a custom `useData` hook, and the
// page layout is enhanced with carousel functionality.

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

// Interface defining the props for the HomePage content
interface HomePageProps {
  heroURL: string; // URL for the hero image displayed on the homepage
}

// The HomePage component is a functional component that renders the main landing page.
// It uses the `useState` hook to manage the state of majors, home data, and stories,
// and the `useEffect` hook to fetch data on mount.
const HomePage: React.FC<HomePageProps> = ({ heroURL }) => {
  // State for storing majors data
  const [majors, setMajor] = useState<Array<Majors>>([]);

  // State for storing home data such as student organization and project photos
  const [homeData, setHomeData] = useState<Home>({
    student_org_photo: '',
    projects_photo: '',
    featured_story: '',
  });

  // State for storing stories data
  const [stories, setStories] = useState<Array<Stories>>([]);

  // Creates a lookup table for stories based on names for quick access
  const storyLookup = parseLookup(stories, 'name');

  // Majors carousel container for handling scroll functionality
  const menuRef = useRef<HTMLDivElement>(null);

  // Function to handle carousel navigation
  const handleNav = (event) => {
    if (menuRef && menuRef.current) {
      const element = (menuRef.current.childNodes[0] as HTMLDivElement);

      // Sourced from: https://stackoverflow.com/a/23270007
      const style = window.getComputedStyle(element);
      const width = element.offsetWidth;
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

      const elementSize = width + margin - padding + border;

      // Scroll the container baed on left or right arrow
      if (event.target.className.includes('home-page-left-arrow')) {
        menuRef.current.scrollBy({
          top: 0,
          left: -elementSize,
          behavior: 'smooth',
        });
      } else {
        menuRef.current.scrollBy({
          top: 0,
          left: +elementSize,
          behavior: 'smooth',
        });
      }
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch majors data
    useData(DataTypes.Majors)
      .then((newData) => setMajor(newData))
      .catch(() => setMajor([]));

    // Fetch home data
    useData(DataTypes.Home)
      .then((newData) => setHomeData(newData[0] || {}))
      .catch(() => setHomeData({
        student_org_photo: '',
        projects_photo: '',
        featured_story: '',
      }));

    // Fetch stories data
    useData(DataTypes.Stories)
      .then((newData) => setStories(newData))
      .catch(() => setStories([]));
  }, [useData]);

  // Retrive featured story from the lookup table
  const story = storyLookup.get(homeData.featured_story);

  return (
    <main className="home-page">
      {/* Hero section with title and hero image */}
      <section className="home-page-landing">
        <div className="home-page-title-section">
          <h1 className="home-page-title">Discover Your Path in Computing</h1>
          <Link to="/organizations">
            <button className="home-page-home-button" type="submit">Find Your Home</button>
          </Link>
        </div>
        <img className="home-page-image" src={heroURL} alt="home page logo" width="320" height="344" />
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

      {/* Majors section with carousel functionality */}
      <button className="home-page-left-arrow" type="submit" onClick={handleNav}>
        <img className="home-page-left-arrow-button" src={CarouselLeftArrow} alt="Left Arrow" />
      </button>
      <button className="home-page-right-arrow" type="submit" onClick={handleNav}>
        <img className="home-page-right-arrow-button" src={CarouselRightArrow} alt="Right Arrow" />
      </button>

      {/* Stories and advice section */}
      <article className="home-page-stories-section">
        <h2 className="home-page-header">Stories &#38; Advice</h2>
        {story && (
        <section className="home-page-stories">
          <div className="home-page-stories-image">
            <img className="home-page-stories-gear" src={Gear} alt="Gear Quote" />
            <img className="home-page-image-circle" src={stories.length > 0 ? story.image : null} alt="Advice" />
          </div>
          <div className="home-page-stories-text">
            <div className="home-page-stories-quote-container">
              <img className="home-page-stories-left-quote" src={LeftQuote} alt="Left Quote" width="24px" height="20px" />
              <p className="home-page-stories-quote">{story.highlighted_quote}</p>
              <img className="home-page-stories-right-quote" src={RightQuote} alt="Right Quote" width="24px" height="20px" />
            </div>
            <h3 className="home-page-stories-name">
              {story.name} &nbsp;
              <span>{`${story.role ? `${story.role}` : ''}${story.role && story.class ? ' | ' : ''}${story.class ? `Class of ${story.class}` : ''}`}</span>
            </h3>
            <Link className="home-page-links" to="/stories">
              <button id="home-page-stories-button" className="home-page-home-button" type="submit">Read More</button>
            </Link>
          </div>

        </section>
        )}
      </article>

      {/* Student Organizations section */}
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

      {/* Projects section */}
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
