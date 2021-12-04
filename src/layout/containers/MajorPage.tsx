import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import MajorPage from '../components/MajorPage';
import Footer from '../components/Footer';

import { DataTypes, useData } from '../../utils/data';
import { parseLookup } from '../../utils/funcs';

const MajorPageContainer: React.FC = () => {
  const [header, setHeader] = useState<string>('');

  useEffect(() => {
    useData(DataTypes.Headers)
      .then((newData) => setHeader(parseLookup(newData).get('majors').image))
      .catch(() => setHeader(''));
  }, [useData]);

  return (
    <>
      <Header heroURL={header} />
      <PageLayout>
        <MajorPage />
      </PageLayout>
      <Footer />
    </>
  );
};

export default MajorPageContainer;
