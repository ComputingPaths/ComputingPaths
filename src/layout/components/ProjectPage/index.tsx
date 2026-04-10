// File: ProjectPage/index.tsx
// This component renders a page displaying various projects created by students. It allows users
// to filter projects by category using buttons and a dropdown for mobile devices. Each project
// is displayed using the ProjectCard component.

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import {
  DataTypes, useData, Projects,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';
import ProjectCard from '../ProjectCard';

import './style.scss';

const colors = ['white', 'light-green', 'light-yellow', 'light-red', 'light-blue', 'light-brown', 'mint'];

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

  useEffect(() => {
    document.title = 'Projects | Computing Paths';
  }, []);

  const filteredProjectsCount = data.filter((project) => {
    if (filter === '') return true;
    const verboseTags = parseList(project.tags).map((tagCode) => {
      const tag = projectTagMap.get(tagCode);
      return tag ? tag.name : null;
    });
    return verboseTags.includes(filter);
  }).length;

  return (
    <div className="projects-page">
      <p aria-live="polite" aria-atomic="true" className="sr-only">{filteredProjectsCount} projects shown</p>
      <h1 className="projects-page-title">Projects</h1>
      <p className="projects-page-text">Computing students create impressive bodies of work throughout their time at UC San Diego, whether for classes, internships, or just for fun.</p>
      <p className="projects-page-heading">Learn more about computing majors</p>
      <div className="projects-page-tag-section">
        <button
          className={`projects-page-tag-button${filter === '' ? ' select' : ''}`}
          type="button"
          aria-pressed={filter === ''}
          onClick={() => setFilter('')}
        >
          All
        </button>

        {projectTagsData.map((tag) => (
          <button
            key={tag.name}
            className={`projects-page-tag-button${filter === tag.name ? ' select' : ''}`}
            type="button"
            aria-pressed={filter === tag.name}
            onClick={() => setFilter(tag.name)}
          >
            {tag.name}
          </button>
        ))}
      </div>

      <div className="projects-page-mobile-dropdown">
        <Dropdown
          className="dropdown-root"
          controlClassName="dropdown-control"
          arrowClassName="dropdown-arrow"
          options={projectTagValues}
          placeholder="Select a project category"
          onChange={(tag) => (tag.value !== 'All' ? setFilter(tag.value) : setFilter(''))}
        />
      </div>

      <div className="projects-page-projects">
        {data.map((project) => {
          const verboseTags = parseList(project.tags).map((tagCode) => {
            const tag = projectTagMap.get(tagCode);
            return tag ? tag.name : null;
          });

          if (filter === '' || verboseTags.includes(filter)) {
            return (
              <ProjectCard
                key={project.name}
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
    </div>
  );
};

export default ProjectPage;
