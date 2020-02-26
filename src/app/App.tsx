import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/auth" component={Auth}/>
      </Switch>
    </Router>
  );
}
