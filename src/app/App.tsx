import React from 'react';

import { MuiThemeProvider, } from '@material-ui/core';
import { Router } from 'react-router-dom';
import createBrowserHistory from './config/History';

import './App.css';
import Routes from './Routes';
import materialConfig from './config/MaterialTheme';

export default function App() {

  return (
    <MuiThemeProvider theme={ materialConfig }>
      <Router history={ createBrowserHistory }>
        <Routes/>
      </Router>
    </MuiThemeProvider>
  );
}
