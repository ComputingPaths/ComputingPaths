import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

import { DataTypes, useData } from '../../utils/data';
import { parseLookup } from '../../utils/funcs';

const HomePageContainer: React.FC = () => {
  const [header, setHeader] = useState<string>('');

  useEffect(() => {
    useData(DataTypes.Headers)
      .then((newData) => setHeader(parseLookup(newData).get('home').image))
      .catch(() => setHeader(''));
  }, [useData]);

  return (
    <>
      <Header />
      <PageLayout>
        <HomePage heroURL={header} />
      </PageLayout>
      <Footer />
    </>
  );
};

export default HomePageContainer;
