import React, { useEffect, useState } from 'react';
import { DataTypes, useData } from '../../../utils/data';
import OrganizationCard from '../OrganizationCard';

import './style.scss';

const OrganizationPage: React.FC = () => {
  const [orgs, setOrgs] = useState<Array<any>>([]);
  const [orgTags, setOrgTags] = useState<Array<any>>([]);
  const [headerImg, setHeaderImg] = useState<string>('https://i.imgur.com/pBrH1AN.png');

  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    Promise.all([useData(DataTypes.OrgTags), useData(DataTypes.Orgs), useData(DataTypes.Misc)])
      .then((data) => {
        setOrgTags(data[0]);
        setOrgs(data[1]);
        // const objArr = data[2].filter((obj) => (obj.Key === 'orgHeader'));
        // setHeaderImg(objArr[0].Value);
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
        <div className="marquee">
          <ul className="marquee-content">
            <li className="marquee-item">
              <img className="marquee-image" src={headerImg} alt="marquee" />
            </li>
            <li className="marquee-item">
              <img className="marquee-image" src={headerImg} alt="marquee" />
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
          <button className={filter !== '' ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => setFilter('')}>All</button>
          <button className={filter !== 'cs' ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => setFilter('cs')}>Computer Science</button>
          <button className={filter !== 'ad' ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => setFilter('ad')}>Arts & Design</button>
          <button className={filter !== 'ms' ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => setFilter('ms')}>Math & Science</button>
          <button className={filter !== 'en' ? 'orgs-page-tag-button' : 'orgs-page-tag-button select'} type="button" onClick={() => setFilter('en')}>Engineering</button>
        </div>
      </div>
      <div className="orgs-page-main">
        <h2>Discover and connect with other motivated students</h2>
        <div className="orgs-page-grid">
          {orgTags && orgs.map((org) => {
            const tags = org.Tags.split(',');
            const verboseTags = tags.map((tag) => (orgTags[0][tag]));
            if (filter === '' || org.Tags.includes(filter)) {
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
