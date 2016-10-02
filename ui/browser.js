import React from 'react';
import Router from 'react-router/BrowserRouter';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app.js';
import help from './reducers/index.js';

let store = createStore(help, undefined, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementsByTagName('help-app')[0]
);
