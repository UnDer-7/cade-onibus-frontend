import { MuiThemeProvider, } from '@material-ui/core';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import './App.css';
import materialConfig from './config/MaterialTheme';
import Routes from './Routes';

export default function App() {

  return (
    <MuiThemeProvider theme={ materialConfig }>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
