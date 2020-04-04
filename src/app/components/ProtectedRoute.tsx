import React from 'react';

import {
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

interface AuthenticatedRoutePros {
  render: Function;
  path: string;
  exact?: boolean;
  redirect?: string;
}

export default function AuthenticatedRoute(props: AuthenticatedRoutePros) {
  const { path, exact, redirect, render } = props;

  const isAuthenticated = true;

  function handleRender({ match, location, history }: RouteComponentProps) {
    const redirectState = { pathname: redirect, state: { from: location } };

    if (isAuthenticated) return render({ match, location, history });
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
