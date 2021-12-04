import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ProjectPage from '../components/ProjectPage';
import Footer from '../components/Footer';

import { DataTypes, useData } from '../../utils/data';
import { parseLookup } from '../../utils/funcs';

const ProjectPageContainer: React.FC = () => {
  const [header, setHeader] = useState<string>('');

  useEffect(() => {
    useData(DataTypes.Headers)
      .then((newData) => setHeader(parseLookup(newData).get('projects').image))
      .catch(() => setHeader(''));
  }, [useData]);

  return (
    <>
      <Header heroURL={header} />
      <PageLayout>
        <ProjectPage />
      </PageLayout>
      <Footer />
    </>
  );
};

export default ProjectPageContainer;
