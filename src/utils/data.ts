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

export const useData = (gid: DataTypes): Promise<Array<any>> => new Promise((resolve) => {
  const cachedData = sessionStorage.getItem(gid);

  if (cachedData) {
    resolve(JSON.parse(cachedData));
  }

  Papa.parse<any>(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv&gid=${gid}`, {
    download: true,
    header: true,
    complete: (results) => {
      sessionStorage.setItem(gid, JSON.stringify(results.data));
      resolve(results.data);
    },
  });
});
