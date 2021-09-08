import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ConnectPage from './layout/containers/ConnectPage.tsx';
import HomePage from './layout/containers/HomePage';
import MajorPage from './layout/containers/MajorPage';
import ProjectPage from './layout/containers/ProjectPage';
import ResourcePage from './layout/containers/ResourcePage';
import StoryPage from './layout/containers/StoryPage';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/connect" component={ConnectPage} />
      <Route exact path="/majors" component={MajorPage} />
      <Route exact path="/projects" component={ProjectPage} />
      <Route exact path="/resources" component={ResourcePage} />
      <Route exact path="/stories" component={StoryPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
