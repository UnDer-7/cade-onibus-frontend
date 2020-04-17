import React from 'react';

import {
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import AuthService from '../services/AuthService';

import { Function } from '../models/types/Functions';

interface AuthenticatedRoutePros {
  render: Function<RouteComponentProps , React.ReactElement<RouteComponentProps>>;
  path: string;
  exact?: boolean;
  redirect?: string;
}

export default function AuthenticatedRoute(props: AuthenticatedRoutePros) {
  const { path, exact, redirect, render } = props;
  const authService = AuthService;

  function handleRender({ match, location, history }: RouteComponentProps) {
    const redirectState = { pathname: redirect, state: { from: location } };

    if (authService.isAuthenticated()) return render({ match, location, history });
    return (<Redirect to={ redirectState }/>);
  }

  return (
    <Route
      path={ path }
      exact={ exact }
      render={ handleRender }
    />
  );
}

AuthenticatedRoute.defaultProps = {
  exact: false,
  redirect: '/auth',
};
