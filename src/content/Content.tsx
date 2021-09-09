import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Content: React.FC = () => {
  const [data, setData] = useState({});

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
    orgTags: '218206546',
  };

  useEffect(() => {
    const newData = {};
    Object.keys(contentMappings).forEach((page) => {
      const gid = contentMappings[page];
      Papa.parse(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv&gid=${gid}`, {
        download: true,
        header: true,
        complete: (results) => {
          newData[page] = results.data;
        },
      });
    });
    setData(newData);
  }, []);

  return (
    <div>
      {
        typeof (data)
      }
    </div>
  );
};

export default Content;
