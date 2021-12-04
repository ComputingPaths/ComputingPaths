import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import OrganizationPage from '../components/OrganizationPage';
import Footer from '../components/Footer';

import { DataTypes, useData } from '../../utils/data';
import { parseLookup } from '../../utils/funcs';

const OrganizationPageContainer: React.FC = () => {
  const [header, setHeader] = useState<string>('');

  useEffect(() => {
    useData(DataTypes.Headers)
      .then((newData) => setHeader(parseLookup(newData).get('organizations').image))
      .catch(() => setHeader(''));
  }, [useData]);

  return (
    <>
      <Header />
      <PageLayout>
        <OrganizationPage heroURL={header} />
      </PageLayout>
      <Footer />
    </>
  );
};

export default OrganizationPageContainer;
