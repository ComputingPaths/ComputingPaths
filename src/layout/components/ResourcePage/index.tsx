import React, { useEffect, useState } from 'react';

import ResourceCard from '../ResourceCard';

import { DataTypes, useData } from '../../../utils/data';
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

  const [resourcesData, setResourcesData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Resources)
      .then((newData) => setResourcesData(newData))
      .catch(() => setResourcesData([]));
  }, [useData]);

  const [filter, setFilter] = useState<string>('');

  return (
    <main className="resource-page">
      <h1 className="resource-page-title">Resources</h1>
      <p className="resource-page-text">Every path through UCSD is unique, and there&apos;s no right or wrong path. Some students have explored many different routes on their way to finding the right fit for them. These are their stories and advice.</p>
      <div className="resource-page-content">
        <p className="resource-page-heading">Become familiar with campus resources</p>
        <div className="resource-page-tag-section">
          <button className={`resource-page-tag-button${filter === '' ? ' selected' : ''}`} type="button" onClick={() => setFilter('')}>All</button>
          {
          resourceTagsData.map((resource, index) => (
            <button className={`resource-page-tag-button${filter === resource.code ? ' selected' : ''}`} type="button" onClick={() => setFilter(resource.code)} key={index}>{resource.name}</button>
          ))
        }
        </div>
        <div className="resource-page-resource">
          {resourcesData.map((resource) => {
            if (filter === '' || resource.tags.includes(filter)) {
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
