import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';
import ProjectCard from '../ProjectCard';

import './style.scss';

const colors = ['grass-green', 'teal', 'light-orange', 'lilac', 'coral', 'light-blue'];

const ProjectPage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Projects)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);
  const [filter, setFilter] = useState<string[]>([]);

  const [projectTagsData, setProjectTagsData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.ProjectTags)
      .then((newData) => setProjectTagsData(newData))
      .catch(() => setProjectTagsData([]));
  }, [useData]);

  const projectTagMap = parseLookup(projectTagsData);

  const updateFilter = (tag: string) => {
    let newFilter:string[] = [...filter];
    const index = filter.indexOf(tag);

    if (tag !== '' && index === -1) {
      newFilter.push(tag);
    } else if (tag !== '' && index >= 0) {
      newFilter.splice(index, 1);
    }

    if (tag === '' || newFilter.length === 6) {
      newFilter = [];
    }

    setFilter([...newFilter]);
  };

  const checkFilter = (tag: string) => (
    filter.indexOf(tag) === -1
  );

  return (
    <main className="projects-page">
      <h1 className="projects-page-title">Projects</h1>
      <p className="projects-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
      <p className="projects-page-heading">Learn more about computing majors</p>
      <div className="projects-page-tag-section">
        <button className={filter.length !== 0 ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('')}>All</button>
        <button className={checkFilter('Mobile App') ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('Mobile App')}>Mobile App</button>
        <button className={checkFilter('Web App') ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('Web App')}>Web App</button>
        <button className={checkFilter('Arduino') ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('Arduino')}>Arduino</button>
        <button className={checkFilter('Datamining') ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('Datamining')}>Datamining</button>
        <button className={checkFilter('Research') ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('Research')}>Research</button>
        <button className={checkFilter('Game') ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => updateFilter('Game')}>Game</button>
      </div>
      <div className="projects-page-projects">
        {data.map((project) => {
          if (filter.length === 0
            || filter.filter((value) => parseList(project.tags).includes(value)).length !== 0) {
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
