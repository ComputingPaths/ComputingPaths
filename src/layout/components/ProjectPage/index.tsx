import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import {
  DataTypes, useData, Projects,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';
import ProjectCard from '../ProjectCard';

import './style.scss';

const colors = ['cyan-blue', 'light-green', 'light-yellow', 'light-red', 'light-blue', 'light-brown', 'mint'];

const ProjectPage: React.FC = () => {
  const [data, setData] = useState<Array<Projects>>([]);

  useEffect(() => {
    useData(DataTypes.Projects)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);
  const [filter, setFilter] = useState<string>('');

  const [projectTagsData, setProjectTagsData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.ProjectTags)
      .then((newData) => setProjectTagsData(newData))
      .catch(() => setProjectTagsData([]));
  }, [useData]);

  const projectTagMap = parseLookup(projectTagsData);
  const projectTagValues = projectTagsData.map((tagObj) => tagObj.name);
  projectTagValues.unshift('All');

  return (
    <main className="projects-page">
      <h1 className="projects-page-title">Projects</h1>
      <p className="projects-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
      <p className="projects-page-heading">Learn more about computing majors</p>
      <div className="projects-page-tag-section">
        <button className={filter !== '' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('')}>All</button>
        <button className={filter !== 'App' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('App')}>App</button>
        <button className={filter !== 'Art' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Art')}>Art</button>
        <button className={filter !== 'Artificial Intelligence' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Artificial Intelligence')}>Artificial Intelligence</button>
        <button className={filter !== 'Datamining' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Datamining')}>Datamining</button>
        <button className={filter !== 'Game' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Game')}>Game</button>
        <button className={filter !== 'Hardware' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Hardware')}>Hardware</button>
        <button className={filter !== 'Research' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('Research')}>Research</button>
      </div>
      <div className="projects-page-mobile-dropdown">
        <Dropdown className="dropdown-root" controlClassName="dropdown-control" arrowClassName="dropdown-arrow" options={projectTagValues} placeholder="Select a project category" onChange={(tag) => (tag.value !== 'All' ? setFilter(tag.value) : setFilter(''))} />
      </div>
      <div className="projects-page-projects">
        {data.map((project) => {
          const verboseTags = parseList(project.tags).map((tagCode) => {
            const tag = projectTagMap.get(tagCode);
            return tag ? tag.name : null;
          });
          if (filter === ''
            || verboseTags.includes(filter)) {
            return (
              <ProjectCard
                description={project.description}
                organization={project.organization}
                images={parseList(project.images)}
                projectLink={project.link}
                projectMembers={parseList(project.members)}
                projectName={project.name}
                projectTags={parseList(project.tags).map((tagCode) => {
                  const tag = projectTagMap.get(tagCode);

                  return tag
                    ? { name: tag.name, color: colors[tag.index % colors.length] }
                    : null;
                })}
                videoURL={project.videos}
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
