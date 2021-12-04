import React, { useEffect, useState } from 'react';

import OrganizationCard from '../OrganizationCard';

import {
  DataTypes, useData, Orgs,
} from '../../../utils/data';
import { parseList, parseLookup } from '../../../utils/funcs';

import './style.scss';

interface OrganizationPageProps {
  heroURL: string;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ heroURL }) => {
  const [orgs, setOrgs] = useState<Array<Orgs>>([]);
  const [orgTags, setOrgTags] = useState<Array<any>>([]);

  const orgTagMap = parseLookup(orgTags);

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
          <button className={filter.length !== 0 ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => updateFilter('')}>All</button>
          <button className={checkFilter('cs') ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => updateFilter('cs')}>Computer Science</button>
          <button className={checkFilter('ad') ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => updateFilter('ad')}>Arts & Design</button>
          <button className={checkFilter('ms') ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => updateFilter('ms')}>Math & Science</button>
          <button className={checkFilter('en') ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => updateFilter('en')}>Engineering</button>
        </div>
      </div>
      <div className="orgs-page-main">
        <h2>Discover and connect with other motivated students</h2>
        <div className="orgs-page-grid">
          {orgTags && orgs.map((org) => {
            const tags = parseList(org.tags);
            const verboseTags = tags.map((tag) => (orgTagMap.get(tag).name));
            if (filter.length === 0 || filter.some((item) => tags.indexOf(item) >= 0)) {
              return (
                <OrganizationCard
                  key={org.name}
                  name={org.name}
                  img={org.org_image}
                  tags={verboseTags}
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
