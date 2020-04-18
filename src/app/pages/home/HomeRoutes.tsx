import React, { ReactElement } from 'react';

import {
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import Home from './Home';

export default function HomeRoutes({ match }: RouteComponentProps): ReactElement<RouteComponentProps> {
  const { path } = match;
  return (
    <Switch>
      <Route
        path={ `${ path }` }
        component={ Home }
      />
    </Switch>
  );
}
