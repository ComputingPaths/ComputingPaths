// File: MajorPage/index.tsx
// This component renders the main page for majors at UCSD, including a list of
// majors and detailed cards for each major, with options for desktop and mobile navigation.

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { HashLink as Link } from 'react-router-hash-link';

import MajorCard from '../MajorCard';

import {
  DataTypes, useData, Majors,
} from '../../../utils/data';
import {
  parseDegree, parseList, parseLookup, parseSpecializations,
} from '../../../utils/funcs';

import './style.scss';

// MajorPage component renders a list of majors and detailed information about each major.
// It uses state to store and manage data fetched from the backend using the useData hook.
const MajorPage: React.FC = () => {
  // State for storing department data
  const [departmentData, setDepartmentData] = useState<Array<any>>([]);

  // Fetch department data on component mount
  useEffect(() => {
    useData(DataTypes.Departments)
      .then((newData) => setDepartmentData(newData))
      .catch(() => setDepartmentData([]));
  }, [useData]);

  // Create a lookup map for departments
  const departmentMap = parseLookup(departmentData);

  // State for storing major data
  const [majorData, setMajorData] = useState<Array<Majors>>([]);

  // Fetch major data on component mount
  useEffect(() => {
    useData(DataTypes.Majors)
      .then((newData) => setMajorData(newData))
      .catch(() => setMajorData([]));
  }, [useData]);

  // State for storing major specializations data
  const [majorSpecsData, setMajorSpecsData] = useState<Array<any>>([]);

  // Fetch major specializations data on component mount
  useEffect(() => {
    useData(DataTypes.MajorSpecializations)
      .then((newData) => setMajorSpecsData(newData))
      .catch(() => setMajorSpecsData([]));
  }, [useData]);

  // Create a lookup map for major specializations
  const specsMap = parseLookup(majorSpecsData);

  return (
    <div className="major-page">
      <h1 className="major-page-title">Majors</h1>
      <p className="major-page-text">A wide array of majors offer a unique computing experience at UCSD. These major apply computational skills to both new and traditional subject matter, developing programming skills, fostering scientific study, and bolstering creativity.</p>
      <div className="major-page-content">
        <h2 className="major-page-subheading">Learn more about the computing majors</h2>
        <div className="major-page-scroll-content">
          <div className="major-page-sidebar">
            {majorData.map((major, index) => <div className="major-page-link" key={index}><Link smooth to={`/majors#${major.name.replace(/\s/g, '-')}`}>{major.name}</Link></div>)}
          </div>
          {/* Dropdown for mobile navigation */}
          <div className="major-page-mobile-navigation">
            <Dropdown className="dropdown-root" controlClassName="dropdown-control" arrowClassName="dropdown-arrow" options={majorData.map((major) => major.name)} placeholder="Select a major" onChange={(major) => { location.hash = `#${major.value.replace(/\s/g, '-')}`; }} />
          </div>
          {/* Cards for each major */}
          <div className="major-page-cards">
            {majorData.map((major, index) => (
              <MajorCard
                image={major.image}
                name={major.name}
                selective={major.selective === 'TRUE'}
                degreeType={parseDegree(major.degree_type)}
                description={major.description}
                departments={parseList(major.departments).map((departmentCode) => {
                  const department = departmentMap.get(departmentCode);

                  return { title: department.name, url: department.link };
                })}
                links={[
                  { title: major.link_1_title, url: major.link_1_url },
                  { title: major.link_2_title, url: major.link_2_url }]}
                specializations={parseSpecializations(specsMap.get(major.code))}
                note={major.note}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorPage;
