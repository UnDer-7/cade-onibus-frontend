import React, { ReactElement } from 'react';

import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import Home from './Home';

export default function HomeRoutes({ match }: RouteComponentProps): ReactElement<RouteComponentProps> {
  console.log('matech: ', match);
  const { path } = match;

  return (
    <Router>
      <Switch>
        <Route path={ `${ path }` } component={ Home }/>
      </Switch>
    </Router>
  );
}
