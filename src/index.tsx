import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import OrganizationPage from './layout/containers/OrganizationPage';
import HomePage from './layout/containers/HomePage';
import MajorPage from './layout/containers/MajorPage';
import ProjectPage from './layout/containers/ProjectPage';
import ResourcePage from './layout/containers/ResourcePage';
import StoryPage from './layout/containers/StoryPage';
import ErrorPage from './layout/containers/ErrorPage';

import './index.scss';

smoothscroll.polyfill();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/stories" component={StoryPage} />
      <Route exact path="/majors" component={MajorPage} />
      <Route exact path="/organizations" component={OrganizationPage} />
      <Route exact path="/projects" component={ProjectPage} />
      <Route exact path="/resources" component={ResourcePage} />
      <Route path="/" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
