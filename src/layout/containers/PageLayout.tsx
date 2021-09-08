import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

interface PageLayoutContainerProps {
  children: React.ReactChildren | React.ReactChild[] | React.ReactElement;
}

const PageLayoutContainer: React.FC<PageLayoutContainerProps> = (props) => {
  const { children } = props;

  return (
    <PageLayout>
      {children}
    </PageLayout>
  );
};

export default PageLayoutContainer;
