import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from './components/ProtectedRoute';
import AuthRoutes, { AUTH_PATH_PREFIX } from './pages/auth/AuthRoutes';
import HomeRoutes, { HOME_PATH_PREFIX } from './pages/home/HomeRoutes';

export default function Routes(): React.ReactElement {

    return (
    <Switch>
      <Redirect to='/home' from='/' exact/>

      <AuthenticatedRoute path={HOME_PATH_PREFIX} component={ HomeRoutes } />
      <Route path={AUTH_PATH_PREFIX} component={ AuthRoutes }/>
    </Switch>
  );
}
