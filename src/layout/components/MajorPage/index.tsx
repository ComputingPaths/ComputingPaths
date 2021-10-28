import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import MajorCard from '../MajorCard';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const MajorPage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Majors)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);

  const [departmentData, setDepartmentData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Departments)
      .then((newData) => setDepartmentData(newData))
      .catch(() => setData([]));
  }, [useData]);

  const departmentNames = {
    bsc: 'Biological Sciences',
    cse: 'Computer Science',
    bie: 'Bioengineering',
    cog: 'Cognitive Sciences',
    mat: 'Mathematics',
    phy: 'Physics',
    vis: 'Visual Arts',
    mus: 'Music',
    ece: 'Electrical Engineering',
  };

  const departmentURLs = new Map();

  departmentData.forEach((department) => {
    departmentURLs.set(department.Name, department.Link);
  });

  return (
    <div className="major-page">
      <h1 className="major-page-title">Majors</h1>
      <p className="major-page-text">A wide array of majors offer a unique computing experience at UCSD. These major apply computational skills to both new and traditional subject matter, developing programming skills, fostering scientific study, and bolstering creativity.</p>
      <div className="major-page-content">
        <h2 className="major-page-subheading">Learn more about the computing majors</h2>
        <div className="major-page-scroll-content">
          <div className="major-page-sidebar">
            {data.map((major, index) => <div className="major-page-link" key={index}><Link smooth to={`/majors/#${major.Name.replace(/\s/g, '-')}`}>{major.Name}</Link></div>)}
          </div>
          <div className="major-page-cards">
            {data.map((major, index) => (
              <MajorCard
                majorText={major.Name}
                key={index}
                capped={major.Cap === 'TRUE'}
                degreeText={major.Degree === 'bs' ? 'Bachelor of Science' : 'Bachelor of Arts'}
                departments={major.Departments.split(',').map((element) => departmentNames[element])}
                majorDescription={major.Hook}
                photoURL={major.Image}
                linkText={major['Moreinfo Name']}
                linkURL={major['Moreinfo Link']}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorPage;
