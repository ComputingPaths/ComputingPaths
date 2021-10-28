import React, { useEffect, useState } from 'react';

import { DataTypes, useData } from '../../../utils/data';
import ResourceCard from '../ResourceCard';

import './style.scss';

const ResourcePage: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    useData(DataTypes.Resources)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);
  const [filter, setFilter] = useState<string[]>([]);

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
    <main className="resource-page">
      <h1 className="resource-page-title">Resources</h1>
      <p className="resource-page-text">Every path through UCSD is unique, and there’s no right or wrong path. Some students have explored many different routes on their way to finding the right fit for them. These are their stories and advice..</p>
      <p className="resource-page-heading">Become familiar with campus resource</p>
      <div className="resource-page-tag-section">
        <button className={filter.length !== 0 ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('')}>All</button>
        <button className={checkFilter('Mobile App') ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('Mobile App')}>Mobile App</button>
        <button className={checkFilter('Web App') ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('Web App')}>Web App</button>
        <button className={checkFilter('Arduino') ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('Arduino')}>Arduino</button>
        <button className={checkFilter('Datamining') ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('Datamining')}>Datamining</button>
        <button className={checkFilter('Research') ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('Research')}>Research</button>
        <button className={checkFilter('Game') ? 'resource-page-tag-button' : 'resource-page-tag-button select'} type="button" onClick={() => updateFilter('Game')}>Game</button>
      </div>
      <div className="resource-page-resource">
        {data.map((resource) => {
          if (filter.length === 0 || filter.indexOf(resource.Tags) >= 0) {
            return (
              <ResourceCard
                description={resource.Description}
                organization={resource.Organization}
                photoURL={resource.Images}
                resourceLink={resource.Link}
                resourceMembers={resource.Members}
                resourceName={resource.Name}
                resourceTag={resource.Tags}
                videoURL={resource.Videos}
              />
            );
          }
          return null;
        })}
      </div>
    </main>
  );
};

export default ResourcePage;
