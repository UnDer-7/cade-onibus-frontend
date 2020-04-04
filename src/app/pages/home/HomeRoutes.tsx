import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps } from 'react-router-dom';

import Home from './Home';

export default function HomeRoutes({ match }: RouteComponentProps) {
  const { path } = match;

  return (
    <Router>
      <Switch>
        <Route path={`${path}`} component={Home} />
      </Switch>
    </Router>
  );
}
