import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

const HomePageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <HomePage />
    </PageLayout>
    <Footer />
  </>
);

export default HomePageContainer;
