import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ResourcePage from '../components/ResourcePage';
import Footer from '../components/Footer';

import { DataTypes, useData } from '../../utils/data';
import { parseLookup } from '../../utils/funcs';

const ResourcePageContainer: React.FC = () => {
  const [header, setHeader] = useState<string>('');

  useEffect(() => {
    useData(DataTypes.Headers)
      .then((newData) => setHeader(parseLookup(newData).get('resources').image))
      .catch(() => setHeader(''));
  }, [useData]);

  return (
    <>
      <Header heroURL={header} />
      <PageLayout>
        <ResourcePage />
      </PageLayout>
      <Footer />
    </>
  );
};

export default ResourcePageContainer;
