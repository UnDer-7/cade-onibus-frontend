import React from 'react';

import { MuiThemeProvider, } from '@material-ui/core';
import { Router } from 'react-router-dom';
import 'loaders.css/loaders.min.css';
import 'react-block-ui/style.css';

import createBrowserHistory from './config/History';
import materialConfig from './config/MaterialTheme';
import Routes from './Routes';
import './App.scss';

export default function App() {

  return (
    <MuiThemeProvider theme={ materialConfig }>
      <Router history={ createBrowserHistory }>
        <Routes/>
      </Router>
    </MuiThemeProvider>
  );
}
