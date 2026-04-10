// File: OrganizationPage/index.tsx
// This component renders the page for student organizations at UCSD, allowing users to filter
// and explore different organizations by tags. The page includes a header with a marquee, a
// filtering section, and a grid of organization cards.

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import OrganizationCard from '../OrganizationCard';

import {
  DataTypes, useData, Orgs,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';

import './style.scss';

// Define an array of colors for tags
const colors = ['white', 'light-green', 'light-yellow', 'light-red', 'light-blue', 'light-brown', 'mint'];

// Interface for the props of OrganizationPage
interface OrganizationPageProps {
  heroURL: string; // URL for the hero image displayed in the marquee
}

// OrganizationPage component renders a page with a list of student organizations.
// It includes filtering by tags and displays organization cards in a grid layout.
const OrganizationPage: React.FC<OrganizationPageProps> = ({ heroURL }) => {
  // State for storing organizations data
  const [orgs, setOrgs] = useState<Array<Orgs>>([]);

  // State for storing organization tags
  const [orgTags, setOrgTags] = useState<Array<any>>([]);

  // Create a lookup map for organization tags
  const orgTagMap = parseLookup(orgTags);
  const orgTagValues = orgTags.map((tagObj) => tagObj.name);
  orgTagValues.unshift('All'); // Add "All" to the beginning of tag options

  // State for the current filter tag
  const [filter, setFilter] = useState<string>('');

  // State for marquee pause/play
  const [marquePaused, setMarqueePaused] = useState<boolean>(false);

  // Fetch organization and tag data on component mount
  useEffect(() => {
    Promise.all([useData(DataTypes.OrgTags), useData(DataTypes.Orgs)])
      .then((data) => {
        setOrgTags(data[0]);
        setOrgs(data[1]);
      })
      .catch(() => {
        setOrgTags([]);
        setOrgs([]);
      });
  }, [useData]);

  useEffect(() => {
    document.title = 'Student Organizations | Computing Paths';
  }, []);

  const filteredOrgsCount = orgs.filter((org) => {
    if (filter === '') return true;
    const verboseTags = parseList(org.tags).map((tagCode) => {
      const tag = orgTagMap.get(tagCode);
      return tag ? tag.name : null;
    });
    return verboseTags.includes(filter);
  }).length;

  return (
    <div className="orgs-page">
      <p aria-live="polite" aria-atomic="true" className="sr-only">{filteredOrgsCount} organizations shown</p>
      <div className="orgs-page-header">
        <div className="marquee">
          <ul className={`marquee-content${marquePaused ? ' paused' : ''}`}>
            <li className="marquee-item">
              <img className="marquee-image" src={heroURL} alt="banner of different student organization logos at UCSD" />
            </li>
          </ul>
          <button
            type="button"
            className="marquee-pause-button"
            aria-label={marquePaused ? 'Play marquee animation' : 'Pause marquee animation'}
            onClick={() => setMarqueePaused(!marquePaused)}
          >
            {marquePaused ? '▶' : '⏸'}
          </button>
        </div>
        <h1>Student Organizations</h1>
        <p>Student organizations allow for extracurricular experience,
          utilizing and extending skills imparted in computing courses.
          These groups demonstrate creative computing efforts by channeling
          the collaborative spirit of UC San Diego.
        </p>
        <div className="orgs-page-tag-section">
          {/* Tag buttons for filtering organizations */}
          <button className={filter !== '' ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" aria-pressed={filter === ''} onClick={() => setFilter('')}>All</button>
          {
            orgTagValues && orgTagValues.map((tagVal) => {
              if (tagVal !== 'All') return (<button className={filter !== tagVal ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" aria-pressed={filter === tagVal} onClick={() => setFilter(tagVal)}>{tagVal}</button>);
              return null;
            })
          }
        </div>
        <div className="orgs-page-mobile-dropdown">
          {/* Dropdown for mobile tag selection */}
          <Dropdown className="dropdown-root" controlClassName="dropdown-control" arrowClassName="dropdown-arrow" options={orgTagValues} placeholder="Select an organization category" onChange={(tag) => (tag.value !== 'All' ? setFilter(tag.value) : setFilter(''))} />
        </div>
      </div>
      <div className="orgs-page-main">
        <h2>Discover and connect with other motivated students</h2>
        <div className="orgs-page-grid">
          {/* Grid of organization cards */}
          {orgTags && orgs.map((org) => {
            const verboseTags = parseList(org.tags).map((tagCode) => {
              const tag = orgTagMap.get(tagCode);
              return tag ? tag.name : null;
            });
            if (filter === ''
              || verboseTags.includes(filter)) {
              return (
                <OrganizationCard
                  key={org.name}
                  name={org.name}
                  img={org.org_image}
                  tags={parseList(org.tags).map((tagCode) => {
                    const tag = orgTagMap.get(tagCode);

                    return tag
                      ? { name: tag.name, color: colors[tag.index % colors.length] }
                      : null;
                  })}
                  link={org.link}
                  linkedin={org.linkedin}
                  email={org.email}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
