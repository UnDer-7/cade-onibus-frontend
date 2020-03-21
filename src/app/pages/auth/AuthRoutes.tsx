import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps } from 'react-router-dom';

import SignIn from './SignIn';

export default function AuthRoutes({ match } : RouteComponentProps) {
  const { path } = match;

  return (
    <Router>
      <Route path={`${path}/signin`} component={SignIn} />
    </Router>
  );
}
