import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import ResourceCard from '../ResourceCard';

import {
  DataTypes, useData, Resources,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';

import './style.scss';

const colors = ['grass-green', 'teal', 'light-orange', 'lilac', 'coral', 'light-blue'];

const ResourcePage: React.FC = () => {
  const [resourceTagsData, setResourceTagsData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.ResourceTags)
      .then((newData) => setResourceTagsData(newData))
      .catch(() => setResourceTagsData([]));
  }, [useData]);

  const resourceTagMap = parseLookup(resourceTagsData);
  const resourceTagValues = resourceTagsData.map((tagObj) => tagObj.name);
  resourceTagValues.unshift('All');

  const [resourcesData, setResourcesData] = useState<Array<Resources>>([]);

  useEffect(() => {
    useData(DataTypes.Resources)
      .then((newData) => setResourcesData(newData))
      .catch(() => setResourcesData([]));
  }, [useData]);

  const [filter, setFilter] = useState<string>('');

  return (
    <main className="resource-page">
      <h1 className="resource-page-title">Resources</h1>
      <p className="resource-page-text">Discover the many resources available at UC San Diego: study spaces, career and research opportunities, and academic support.</p>
      <div className="resource-page-content">
        <p className="resource-page-heading">Become familiar with campus resources</p>
        <div className="resource-page-map">
          <iframe
            title="resource-map"
            frameBorder="0"
            src="https://www.google.com/maps/d/u/3/embed?mid=1eF2bl9kWspR7kr8wsJFz7WytAg0J1kc&ehbc=2E12F"
            width="1152"
            height="864"
          />
        </div>
        <div className="resource-page-tag-section">
          <button className={`resource-page-tag-button${filter === '' ? ' selected' : ''}`} type="button" onClick={() => setFilter('')}>All</button>
          {
          resourceTagsData.map((resource, index) => (
            <button className={`resource-page-tag-button${filter === resource.name ? ' selected' : ''}`} type="button" onClick={() => setFilter(resource.name)} key={index}>{resource.name}</button>
          ))
        }
        </div>
        <div className="projects-page-mobile-dropdown">
          <Dropdown className="dropdown-root" controlClassName="dropdown-control" arrowClassName="dropdown-arrow" options={resourceTagValues} placeholder="Select a resource category" onChange={(tag) => (tag.value !== 'All' ? setFilter(tag.value) : setFilter(''))} />
        </div>
        <div className="resource-page-resource">
          {resourceTagsData && resourcesData.map((resource) => {
            const verboseTags = parseList(resource.tags).map((tagCode) => {
              const tag = resourceTagMap.get(tagCode);
              return tag ? tag.name : null;
            });
            if (filter === ''
              || verboseTags.includes(filter)) {
              return (
                <ResourceCard
                  image={resource.image}
                  imageLink={resource.image_link}
                  name={resource.name}
                  tags={parseList(resource.tags).map((tagCode) => {
                    const tag = resourceTagMap.get(tagCode);

                    return tag
                      ? { name: tag.name, color: colors[tag.index % colors.length] }
                      : null;
                  })}
                  link={resource.view_more_link}
                  description={resource.description}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </main>
  );
};

export default ResourcePage;
