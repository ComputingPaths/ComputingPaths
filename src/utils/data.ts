import Papa from 'papaparse';

export enum DataTypes {
  Stories = '1646384161',
  Departments = '929723649',
  Majors = '860790804',
  MajorSpecializations = '1867072131',
  Resources = '2135229956',
  ResourcesTags = '167316779',
  ResourceBanner = '1661600010',
  Projects = '1379985722',
  ProjectTags = '568500304',
  Orgs = '1399526925',
  OrgTags = '218206546',
  Misc = '29489883',
  Errors = '395912477',
}

export const useData = (gid: DataTypes): Promise<Array<any>> => new Promise((resolve, reject) => {
  const cacheData = sessionStorage.getItem(gid);

  if (cacheData) {
    resolve(JSON.parse(cacheData));
    return;
  }

  const prefetch = () => {
    Object.keys(DataTypes).forEach((type) => {
      if (DataTypes[type] !== gid) {
        Papa.parse<any>(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv&gid=${DataTypes[type]}`, {
          download: true,
          header: true,
          complete: (results) => {
            const { data } = results;
            if (data.length !== 0) {
              sessionStorage.setItem(DataTypes[type], JSON.stringify(data));
            }
          },
          error: (error) => {
            reject(error);
          },
        });
      }
    });
  };

  Papa.parse<any>(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQPxfDC-DdscHUL8Zj8ObqyoyaB92ffcMtoWnFMbM1oZeCFG6Jwxba23ysjZ2JJEKpPdNwaKTj3PdH5/pub?output=csv&gid=${gid}`, {
    download: true,
    header: true,
    complete: (results) => {
      const { data } = results;

      if (data.length !== 0) {
        sessionStorage.setItem(gid, JSON.stringify(data));
      }

      prefetch();
      resolve(data);
    },
    error: (error) => {
      reject(error);
    },
  });
});
