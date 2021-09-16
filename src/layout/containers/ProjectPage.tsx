import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ProjectPage from '../components/ProjectPage';
import Footer from '../components/Footer';

const ProjectPageContainer: React.FC = () => (
  <>
    <Header heroURL="/img/splashes/splash_projects.jpg" />
    <PageLayout>
      <ProjectPage />
    </PageLayout>
    <Footer />
  </>
);

export default ProjectPageContainer;
