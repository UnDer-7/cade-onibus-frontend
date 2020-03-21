import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './app.css';

import Home from './pages/home/Home';
import AuthRoutes from './pages/auth/AuthRoutes';
import EnvVariables from './utils/environmentVariables';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: EnvVariables.PRIMARY_COLOR,
    },
    secondary: {
      main: '#fbfff7'
    }
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={ Home }/>
          <Route path="/auth" component={ AuthRoutes }/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
