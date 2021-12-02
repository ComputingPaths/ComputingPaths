import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';
import ProjectCard from '../ProjectCard';

import './style.scss';

const ProjectPage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Projects)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);
  const [filter, setFilter] = useState<string>('');

  return (
    <main className="projects-page">
      <h1 className="projects-page-title">Projects</h1>
      <p className="projects-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
      <p className="projects-page-heading">Learn more about computing majors</p>
      <div className="projects-page-tag-section">
        <button className={filter !== '' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('')}>All</button>
        <button className={filter !== 'Mobile App' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Mobile App')}>Mobile App</button>
        <button className={filter !== 'Web App' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Web App')}>Web App</button>
        <button className={filter !== 'Arduino' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Arduino')}>Arduino</button>
        <button className={filter !== 'Datamining' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Datamining')}>Datamining</button>
        <button className={filter !== 'Research' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Research')}>Research</button>
        <button className={filter !== 'Game' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Game')}>Game</button>
      </div>
      <div className="projects-page-projects">
        {data.map((project) => {
          if (filter === '' || project.Tags.includes(filter)) {
            return (
              <ProjectCard
                description={project.Description}
                organization={project.Organization}
                photoURL={project.Images}
                projectLink={project.Link}
                projectMembers={project.Members}
                projectName={project.Name}
                projectTag={project.Tags}
                videoURL={project.Videos}
              />
            );
          }
          return null;
        })}
      </div>
    </main>
  );
};

export default ProjectPage;
