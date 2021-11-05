import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import MajorCard from '../MajorCard';

import { DataTypes, useData } from '../../../utils/data';
import { parseDegree, parseList, parseLookup } from '../../../utils/funcs';

import './style.scss';

const MajorPage: React.FC = () => {
  const [departmentData, setDepartmentData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Departments)
      .then((newData) => setDepartmentData(newData))
      .catch(() => setDepartmentData([]));
  }, [useData]);

  const departmentMap = parseLookup(departmentData);

  const [majorData, setMajorData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Majors)
      .then((newData) => setMajorData(newData))
      .catch(() => setMajorData([]));
  }, [useData]);

  // const [majorSpecsData, setMajorSpecsData] = useState<Array<any>>([]);

  // useEffect(() => {
  //   useData(DataTypes.MajorSpecs)
  //     .then((newData) => setMajorSpecsData(newData))
  //     .catch(() => setMajorSpecsData([]));
  // }, [useData]);

  // const specsMap = parseLookup(majorSpecsData);

  return (
    <div className="major-page">
      <h1 className="major-page-title">Majors</h1>
      <p className="major-page-text">A wide array of majors offer a unique computing experience at UCSD. These major apply computational skills to both new and traditional subject matter, developing programming skills, fostering scientific study, and bolstering creativity.</p>
      <div className="major-page-content">
        <h2 className="major-page-subheading">Learn more about the computing majors</h2>
        <div className="major-page-scroll-content">
          <div className="major-page-sidebar">
            {majorData.map((major, index) => <div className="major-page-link" key={index}><Link smooth to={`/majors/#${major.name.replace(/\s/g, '-')}`}>{major.name}</Link></div>)}
          </div>
          <div className="major-page-cards">
            {majorData.map((major, index) => (
              <MajorCard
                image={major.image}
                name={major.name}
                capped={major.capped === 'TRUE'}
                degree_type={parseDegree(major.degree_type)}
                description={major.description}
                departments={parseList(major.departments).map((department_code) => {
                  const department = departmentMap.get(department_code);
                  return { title: department.name, url: department.link };
                })}
                links={[
                  { title: major.link_1_title, url: major.link_1_url },
                  { title: major.link_2_title, url: major.link_2_url }]}
                specializations={[]} // TODO
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
