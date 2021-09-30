import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import StickyBox from 'react-sticky-box';

import MajorCard from '../MajorCard';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const MajorPage: React.FC = () => {
  const data = useData(DataTypes.Majors);
  const departmentData = useData(DataTypes.Departments);
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
          <StickyBox className="major-page-sidebar" offsetTop={10} offsetBottom={10}>
            {data.map((major) => <div className="major-page-link"><Link smooth to={`majors/#${major.Name.replace(/\s/g, '-')}`}>{major.Name}</Link></div>)}
          </StickyBox>
          <div className="major-page-cards">
            {data.map((major) => (
              <MajorCard
                majorText={major.Name}
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
