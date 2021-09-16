import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import OrganizationPage from '../components/OrganizationPage';
import Footer from '../components/Footer';

const OrganizationPageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <OrganizationPage />
    </PageLayout>
    <Footer />
  </>
);

export default OrganizationPageContainer;
