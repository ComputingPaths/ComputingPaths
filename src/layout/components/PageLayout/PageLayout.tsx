// File: PageLayout/PageLayout.tsx
// This component provides a layout wrapper for pages, placing the content within a main
// container to ensure consistent styling and structure across the website.

import React from 'react';

import './style.scss';

// Interface for the props of PageLayout
interface PageLayoutProps {
  children: React.ReactNode; // The child components or elements to be rendered within the layout
}

// PageLayout component provides a consistent structure for pages by wrapping content
// within a main container. The children prop represents the content passed to the layout.
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
