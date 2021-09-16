import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

interface PageLayoutContainerProps {
  children: React.ReactNode
}

const PageLayoutContainer: React.FC<PageLayoutContainerProps> = ({ children }) => (
  <PageLayout>
    {children}
  </PageLayout>
);

export default PageLayoutContainer;
