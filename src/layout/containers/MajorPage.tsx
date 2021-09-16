import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import MajorPage from '../components/MajorPage';
import Footer from '../components/Footer';

const MajorPageContainer: React.FC = () => (
  <>
    <Header heroURL="/img/splashes/splash_major.jpg" />
    <PageLayout>
      <MajorPage />
    </PageLayout>
    <Footer />
  </>
);

export default MajorPageContainer;
