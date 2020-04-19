import React, { ComponentType, ReactElement } from 'react';

import {
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import AuthService from '../services/AuthService';

export default function AuthenticatedRoute(props: AuthenticatedRoutePros): ReactElement {
  const { path, exact, redirect, component } = props;

  function handleRender({ location }: RouteComponentProps) {
    const redirectState = { pathname: redirect, state: { from: location } };

    if (AuthService.isAuthenticated()) return React.createElement(component as any, props);
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

interface AuthenticatedRoutePros {
  component: ComponentType | ReactElement;
  path: string;
  exact?: boolean;
  redirect?: string;
}

AuthenticatedRoute.defaultProps = {
  exact: false,
  redirect: '/auth',
};
