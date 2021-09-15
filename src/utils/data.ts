import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

export enum PageTypes {
  Pages = 'pages',
  Stories = 'stories',
  Majors = 'majors',
  Departments = 'departments',
  MajorDescriptions = 'majorDescriptions',
  MajorExpand = 'majorExpand',
  Resources = 'resources',
  ResourcesTags = 'resourcesTags',
  ResourceBanner = 'resourceBanner',
  Projects = 'projects',
  ProjectTags = 'projectTags',
  Orgs = 'orgs',
  OrgTags = 'orgTags',
}

export const useData: React.FC = (page: PageTypes): Array<{}> => {
  const [data, setData] = useState([]);

  const contentMappings = {
    pages: '1910980686',
    stories: '1646384161',
    majors: '860790804',
    departments: '929723649',
    majorDescriptions: '1664677404',
    majorExpand: '1867072131',
    resources: '2135229956',
    resourcesTags: '167316779',
    resourceBanner: '1661600010',
    projects: '1379985722',
    projectTags: '568500304',
    orgs: '1399526925',
    orgTags: '218206546',
  };

  useEffect(() => {
    const gid = contentMappings[page];
    Papa.parse(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv&gid=${gid}`, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, [page]);

  return data;
};
