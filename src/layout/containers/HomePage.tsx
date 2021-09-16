import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import HomePage from '../components/HomePage';

const HomePageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <HomePage />
    </PageLayout>
  </>
);

export default HomePageContainer;
