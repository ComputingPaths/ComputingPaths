import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ErrorPage from '../components/ErrorPage';
import Footer from '../components/Footer';

const ErrorPageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <ErrorPage />
    </PageLayout>
    <Footer />
  </>
);

export default ErrorPageContainer;
