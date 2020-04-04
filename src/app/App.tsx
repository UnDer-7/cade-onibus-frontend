import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import './app.css';
import AuthenticatedRoute from './components/ProtectedRoute';
import AuthRoutes from './pages/auth/AuthRoutes';

import HomeRoutes from './pages/home/HomeRoutes';
import EnvVariables from './utils/environmentVariables';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: EnvVariables.PRIMARY_COLOR,
    },
    secondary: {
      main: '#fbfff7',
    },
  },
});

export default function App() {
  function renderHomeRoutes(props: RouteComponentProps) {
    const { match, location, history } = props;

    return (<HomeRoutes history={ history } location={ location } match={ match }/>);
  }

  return (
    <MuiThemeProvider theme={ theme }>
      <Router>
        <Switch>
          <Redirect to='/home' from='/' exact/>

          <AuthenticatedRoute path='/home' render={ renderHomeRoutes } exact/>
          <Route path="/auth" component={ AuthRoutes }/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
