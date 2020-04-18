import { MuiThemeProvider, } from '@material-ui/core';
import React from 'react';

import { BrowserRouter, Redirect, Route, Switch, } from 'react-router-dom';

import './App.css';
import materialConfig from './config/MaterialTheme';
import AuthenticatedRoute from './components/ProtectedRoute';
import AuthRoutes from './pages/auth/AuthRoutes';
import HomeRoutes from './pages/home/HomeRoutes';

export default function App() {

  return (
    <MuiThemeProvider theme={ materialConfig }>
      <BrowserRouter>
        <Switch>
          <Redirect to='/home' from='/' exact/>

          <Route path='/home' component={ HomeRoutes } />
          <Route path="/auth" component={ AuthRoutes } />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
