import React from 'react';

import './style.scss';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <main className="content">
        {children}
      </main>
    </>
  );
};

export default PageLayout;
