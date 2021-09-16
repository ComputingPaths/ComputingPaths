import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import StoryPage from '../components/StoryPage';
import Footer from '../components/Footer';

const StoryPageContainer: React.FC = () => (
  <>
    <Header heroURL="/img/splashes/splash_stories.jpg" />
    <PageLayout>
      <StoryPage />
    </PageLayout>
    <Footer />
  </>
);

export default StoryPageContainer;
