import React from 'react';

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import AuthenticatedRoute from './components/ProtectedRoute';
import AuthRoutes from './pages/auth/AuthRoutes';
import HomeRoutes from './pages/home/HomeRoutes';

export default function Routes(): React.ReactElement {
  function renderHomeRoutes(propsRender: RouteComponentProps): React.ReactElement<RouteComponentProps> {
    const { match, location, history } = propsRender;

    return (<HomeRoutes history={ history } location={ location } match={ match }/>);
  }

  return (
    <Switch>
      <Redirect to='/home' from='/' exact/>

      {/*<AuthenticatedRoute path='/home' render={ renderHomeRoutes } exact />*/}
      <Route path="/home" component={ HomeRoutes }/>
      <Route path="/auth" component={ AuthRoutes }/>
    </Switch>
  );
}
