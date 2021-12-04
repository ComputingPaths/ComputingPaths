import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import StoryPage from '../components/StoryPage';
import Footer from '../components/Footer';

import { DataTypes, useData } from '../../utils/data';
import { parseLookup } from '../../utils/funcs';

const StoryPageContainer: React.FC = () => {
  const [header, setHeader] = useState<string>('');

  useEffect(() => {
    useData(DataTypes.Headers)
      .then((newData) => setHeader(parseLookup(newData).get('stories').image))
      .catch(() => setHeader(''));
  }, [useData]);

  return (
    <>
      <Header heroURL={header} />
      <PageLayout>
        <StoryPage />
      </PageLayout>
      <Footer />
    </>
  );
};

export default StoryPageContainer;
