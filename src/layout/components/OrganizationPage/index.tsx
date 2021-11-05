import React, { useEffect, useState } from 'react';
import { DataTypes, useData } from '../../../utils/data';
import OrganizationCard from '../OrganizationCard';

import './style.scss';

const OrganizationPage: React.FC = () => {
  const [orgs, setOrgs] = useState<Array<any>>([]);
  const [orgTags, setOrgTags] = useState<Array<any>>([]);
  const [headerImg, setHeaderImg] = useState<string>('');

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
    Promise.all([useData(DataTypes.OrgTags), useData(DataTypes.Orgs), useData(DataTypes.Misc)])
      .then((data) => {
        setOrgTags(data[0]);
        setOrgs(data[1]);
        const objArr = data[2].filter((obj) => (obj.Key === 'orgHeader'));
        setHeaderImg(objArr[0].Value);
      })
      .catch(() => {
        setOrgTags([]);
        setOrgs([]);
        setHeaderImg('');
      });
  }, [useData]);

  return (
    <div className="orgs-page">
      <div className="orgs-page-header">
        <img src={headerImg} alt="Student Organization Logos" />
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
            const tags = org.Tags.split(',');
            const verboseTags = tags.map((tag) => (orgTags[0][tag]));
            if (filter.length === 0 || filter.some((item) => tags.indexOf(item) >= 0)) {
              return (
                <OrganizationCard
                  key={org.Name}
                  name={org.Name}
                  img={org.Orgimage}
                  tags={verboseTags}
                  link={org.Link}
                  linkedin={org.Linkedin}
                  email={org.Email}
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
