import Papa from 'papaparse';

export enum DataTypes {
  Headers = '29489883',
  Home='395547379',
  Stories = '1646384161',
  Departments = '929723649',
  Majors = '860790804',
  MajorSpecializations = '1867072131',
  Resources = '2135229956',
  ResourceTags = '167316779',
  Projects = '1379985722',
  ProjectTags = '568500304',
  Orgs = '1399526925',
  OrgTags = '218206546',
}

export interface Home {
  'student_org_photo': string;
  'projects_photo': string;
}

export interface Stories {
  name: string;
  role: string;
  'class': string;
  'highlighted_quote': string;
  quote: string;
  image: string;
  link: string;
}

export interface Majors {
  code: string;
  name: string;
  capped: string;
  'degree_type': string;
  departments: string;
  hook: string;
  description: string;
  'link_1_title': string;
  'link_1_url': string;
  'link_2_title': string;
  'link_2_url': string;
  image: string;
  note: string;
}

export interface Resources {
  name: string;
  description: string;
  image: string;
  'image_link': string;
  'view_more_link': string;
  tags: string;
}

export interface Projects {
  name: string;
  organization: string;
  intro: string;
  description: string;
  members: string;
  images: string;
  videos: string;
  link: string;
  tags: string;
}

export interface Orgs {
  name: string;
  description: string;
  'org_image': string;
  link: string;
  linkedin: string;
  email: string;
  tags: string;
  type: string;
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
