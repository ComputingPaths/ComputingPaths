import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import StoryPage from '../components/StoryPage';

const StoryPageContainer: React.FC = () => (
  <>
    <Header heroURL="/img/splashes/splash_stories.jpg" />
    <PageLayout>
      <StoryPage />
    </PageLayout>
  </>
);

export default StoryPageContainer;
