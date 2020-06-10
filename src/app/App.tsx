import React, { useState } from 'react';

import { MuiThemeProvider, } from '@material-ui/core';
import { Router } from 'react-router-dom';
import 'loaders.css/loaders.min.css';
import 'react-block-ui/style.css';
import { Color } from '@material-ui/lab';

import createBrowserHistory from './config/History';
import materialConfig from './config/MaterialTheme';
import Routes from './Routes';
import './App.scss';
import { Toast } from './components';
import { Interceptor } from './Interceptor';


export default function App() {
  const [ isShowing, setShow ] = useState<boolean>(false);
  const [ message, setMessage ] = useState<string>('');
  const [ color, setColor ] = useState<Color>('error');

  Interceptor.configure(setShow, setMessage, setColor);

  return (
    <MuiThemeProvider theme={ materialConfig }>
      <Router history={ createBrowserHistory }>
        <Toast show={isShowing} setShow={setShow} message={message} type={color}/>
        <Routes/>
      </Router>
    </MuiThemeProvider>
  );
}
