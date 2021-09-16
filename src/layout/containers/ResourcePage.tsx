import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ResourcePage from '../components/ResourcePage';
import Footer from '../components/Footer';

const ResourcePageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <ResourcePage />
    </PageLayout>
    <Footer />
  </>
);

export default ResourcePageContainer;
