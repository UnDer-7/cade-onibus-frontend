import React, { ReactElement } from 'react';

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import SignIn from './SignIn';

export default function AuthRoutes({ match }: RouteComponentProps): ReactElement<RouteComponentProps> {
  const { path } = match;

  return (
    <>
      <Redirect to={ `${ path }/signin` } from={ path }/>
      <Switch>

        <Route
          path={ `${ path }/signin` }
          component={ SignIn }
        />
      </Switch>
    </>
  );
}
