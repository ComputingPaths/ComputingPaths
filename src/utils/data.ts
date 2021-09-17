import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export enum DataTypes {
  Pages = '1910980686',
  Stories = '1646384161',
  Majors = '860790804',
  Departments = '929723649',
  MajorDescriptions = '1664677404',
  MajorExpand = '1867072131',
  Resources = '2135229956',
  ResourcesTags = '167316779',
  ResourceBanner = '1661600010',
  Projects = '1379985722',
  ProjectTags = '568500304',
  Orgs = '1399526925',
  OrgTags = '218206546',
  Errors = '395912477',
}

const fetchData = (gid: DataTypes): Array<any> => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    Papa.parse<any>(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv&gid=${gid}`, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, [gid]);

  return data;
};

export const useData = (gid: DataTypes): Array<any> => {
  const cacheData = sessionStorage.getItem(gid);

  if (cacheData) {
    return JSON.parse(cacheData);
  }

  const newData = fetchData(gid);

  if (newData.length !== 0) {
    sessionStorage.setItem(gid, JSON.stringify(newData));
  }

  return newData;
};
