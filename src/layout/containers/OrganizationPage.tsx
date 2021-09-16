import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import OrganizationPage from '../components/OrganizationPage';

const OrganizationPageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <OrganizationPage />
    </PageLayout>
  </>
);

export default OrganizationPageContainer;
