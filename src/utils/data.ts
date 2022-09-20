import Papa from 'papaparse';

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqa6YgNEdB5SzjzJ-nXG92HF4Xu6imIK3dcVEsiI4JgVYH0tK7T4hsl97F2ibOs7Jyc2Tt8PX3I3Ev/pub?output=csv';

export enum DataTypes {
  Headers = '1406986876',
  Home='258274824',
  Stories = '945891449',
  Majors = '671599184',
  Departments = '708783744',
  MajorSpecializations = '282915431',
  Resources = '724376777',
  ResourceTags = '889894826',
  Projects = '1080412543',
  ProjectTags = '981158604',
  Orgs = '1598985992',
  OrgTags = '1495718252',
}

export interface Home {
  'student_org_photo': string;
  'projects_photo': string;
  'featured_story': string;
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
        Papa.parse<any>(`${SPREADSHEET_URL}&gid=${DataTypes[type]}`, {
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

  Papa.parse<any>(`${SPREADSHEET_URL}&gid=${gid}`, {
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
