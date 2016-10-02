import React from 'react';
import Router from 'react-router/BrowserRouter';
import { render } from 'react-dom';
import App from './components/app.js';

render(
  <Router>
    <App />
  </Router>,
  document.getElementsByTagName('help-app')[0]
);
