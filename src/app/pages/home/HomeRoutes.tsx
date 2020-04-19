import React, { ReactElement } from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';

export const HOME_PATH_PREFIX: string = '/home';

export const HOME_PATH: string = `${ HOME_PATH_PREFIX }`;

export default function HomeRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path={ `${ HOME_PATH }` }
        component={ Home }
      />
    </Switch>
  );
}
