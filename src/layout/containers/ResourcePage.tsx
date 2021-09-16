import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ResourcePage from '../components/ResourcePage';

const ResourcePageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <ResourcePage />
    </PageLayout>
  </>
);

export default ResourcePageContainer;
