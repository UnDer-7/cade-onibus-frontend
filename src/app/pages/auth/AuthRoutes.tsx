import React, { ReactElement } from 'react';

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import SignIn from './SignIn';

export const AUTH_PATH_PREFIX: string = '/auth';

export const SIGN_IN_PATH: string = `${ AUTH_PATH_PREFIX }/signin`;

export default function AuthRoutes({ match }: RouteComponentProps): ReactElement<RouteComponentProps> {
  const { path } = match;

  return (
    <>
      <Redirect to={ SIGN_IN_PATH } from={ path }/>
      <Switch>

        <Route
          path={ SIGN_IN_PATH }
          component={ SignIn }
        />
      </Switch>
    </>
  );
}
