import React, { ReactElement } from 'react';

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import SignIn from './sign-in/SignIn';
import NewAccount from './new-account/NewAccount';
import ForgotPassword from './forgot-password/ForgotPassword';

export const AUTH_PATH_PREFIX: string = '/auth';

export const SIGN_IN_PATH: string = `${ AUTH_PATH_PREFIX }/signin`;
export const NEW_ACCOUNT_PATH: string = `${ AUTH_PATH_PREFIX }/new-account`;
export const FORGOT_PASSWORD_PATH: string = `${ AUTH_PATH_PREFIX }/forgot-password`;

export default function AuthRoutes({ match, location }: RouteComponentProps): ReactElement<RouteComponentProps> {
  const { path } = match;
  const { pathname } = location;

  const canRedirectToSignIn =
    pathname === AUTH_PATH_PREFIX ||
    pathname === `${ AUTH_PATH_PREFIX }/`;

  return (
    <Switch>
      {
        canRedirectToSignIn && (<Redirect to={ SIGN_IN_PATH } from={ path }/>)
      }
      <Route
        exact
        path={ SIGN_IN_PATH }
        component={ SignIn }
      />
      <Route
        exact
        path={ NEW_ACCOUNT_PATH }
        component={ NewAccount }
      />
      <Route
        exact
        path={ FORGOT_PASSWORD_PATH }
        component={ ForgotPassword }
      />
    </Switch>
  );
}
