// File: ResourcePage/index.tsx
// This component renders a page displaying various resources available at UC San Diego. Users
// can filter resources by category using buttons or a dropdown menu for mobile devices. Each
// resource is displayed using the ResourceCard component.

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import ResourceCard from '../ResourceCard';

import {
  DataTypes, useData, Resources,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';

import './style.scss';

// Define an array of colors for resource tags
const colors = ['white', 'light-green', 'light-yellow', 'light-red', 'light-blue', 'light-brown', 'mint'];

// ResourcePage component renders a list of campus resources, including filtering by tags.
// The resources are displayed in a grid layout using ResourceCard components.
const ResourcePage: React.FC = () => {
  const [resourceTagsData, setResourceTagsData] = useState<Array<any>>([]);

  // Fetch resource tags data on component mount
  useEffect(() => {
    useData(DataTypes.ResourceTags)
      .then((newData) => setResourceTagsData(newData))
      .catch(() => setResourceTagsData([]));
  }, [useData]);

  // Create a lookup map for resource tags
  const resourceTagMap = parseLookup(resourceTagsData);
  const resourceTagValues = resourceTagsData.map((tagObj) => tagObj.name);
  resourceTagValues.unshift('All'); // Add "All" to the beginning of tag options

  // State for storing resources data
  const [resourcesData, setResourcesData] = useState<Array<Resources>>([]);

  // Fetch resources data on component mount
  useEffect(() => {
    useData(DataTypes.Resources)
      .then((newData) => setResourcesData(newData))
      .catch(() => setResourcesData([]));
  }, [useData]);

  // State for the current filter tag
  const [filter, setFilter] = useState<string>('');

  return (
    <main className="resource-page">
      <h1 className="resource-page-title">Resources</h1>
      <p className="resource-page-text">Discover the many resources available at UC San Diego: study spaces, career and research opportunities, and academic support.</p>
      <div className="resource-page-content">
        <p className="resource-page-heading">Become familiar with campus resources</p>
        <div className="resource-page-map">
          {/* Embed a Google Map showing resource locations on campus */}
          <iframe
            className="resource-page-map-iframe"
            title="resource-map"
            frameBorder="0"
            src="https://www.google.com/maps/d/u/3/embed?mid=1qNFk4YFl86VMKQ-KYxR0qwWEUyMbpU8&ehbc=2E312F"
            width="1152"
            height="864"
          />
        </div>
        <div className="resource-page-tag-section">
          {/* Tag buttons for filtering resources */}
          <button className={`resource-page-tag-button${filter === '' ? ' selected' : ''}`} type="button" onClick={() => setFilter('')}>All</button>
          {
          resourceTagsData.map((resource, index) => (
            <button className={`resource-page-tag-button${filter === resource.name ? ' selected' : ''}`} type="button" onClick={() => setFilter(resource.name)} key={index}>{resource.name}</button>
          ))
        }
        </div>
        <div className="projects-page-mobile-dropdown">
          {/* Dropdown for mobile tag selection */}
          <Dropdown className="dropdown-root" controlClassName="dropdown-control" arrowClassName="dropdown-arrow" options={resourceTagValues} placeholder="Select a resource category" onChange={(tag) => (tag.value !== 'All' ? setFilter(tag.value) : setFilter(''))} />
        </div>
        <div className="resource-page-resource">
          {/* Grid of resource cards */}
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
