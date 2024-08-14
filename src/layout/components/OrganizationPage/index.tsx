import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import OrganizationCard from '../OrganizationCard';

import {
  DataTypes, useData, Orgs,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';

import './style.scss';

const colors = ['white', 'light-green', 'light-yellow', 'light-red', 'light-blue', 'light-brown', 'mint'];

interface OrganizationPageProps {
  heroURL: string;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ heroURL }) => {
  const [orgs, setOrgs] = useState<Array<Orgs>>([]);
  const [orgTags, setOrgTags] = useState<Array<any>>([]);

  const orgTagMap = parseLookup(orgTags);
  const orgTagValues = orgTags.map((tagObj) => tagObj.name);
  orgTagValues.unshift('All');

  const [filter, setFilter] = useState<string>('');

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

  return (
    <div className="orgs-page">
      <div className="orgs-page-header">
        <div className="marquee">
          <ul className="marquee-content">
            <li className="marquee-item">
              <img className="marquee-image" src={heroURL} alt="marquee" />
            </li>
            <li className="marquee-item">
              <img className="marquee-image" src={heroURL} alt="marquee" />
            </li>
          </ul>
        </div>
        <h1>Student Organizations</h1>
        <p>Student organizations allow for extracurricular experience,
          utilizing and extending skills imparted in computing courses.
          These groups demonstrate creative computing efforts by channeling
          the collaborative spirit of UC San Diego.
        </p>
        <div className="orgs-page-tag-section">
          <button className={filter !== '' ? 'projects-page-tag-button' : 'projects-page-tag-button select'} type="button" onClick={() => setFilter('')}>All</button>
          {
            orgTagValues && orgTagValues.map((tagVal) => {
              if (tagVal !== 'All') return (<button className={filter !== tagVal ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => setFilter(tagVal)}>{tagVal}</button>);
              return null;
            })
          }
        </div>
        <div className="projects-page-mobile-dropdown">
          <Dropdown className="dropdown-root" controlClassName="dropdown-control" arrowClassName="dropdown-arrow" options={orgTagValues} placeholder="Select an organization category" onChange={(tag) => (tag.value !== 'All' ? setFilter(tag.value) : setFilter(''))} />
        </div>
      </div>
      <div className="orgs-page-main">
        <h2>Discover and connect with other motivated students</h2>
        <div className="orgs-page-grid">
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
