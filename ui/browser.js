import React from 'react';
import Router from 'react-router/BrowserRouter';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app.js';
import help from './reducers/index.js';
import CustomerNormalizer from './normalizers/customer.js';

let initialState;

let element = document.getElementById('state');
if (element) {
  try {
    initialState = JSON.parse(element.innerText);
    let normalizer = new CustomerNormalizer();
    initialState.customer.list = initialState.customer.list.map((item) => {
      return normalizer.normalize(item);
    });
    initialState.customer.draft = normalizer.normalize(initialState.customer.draft);
  } catch (e) {
    console.log(e);
  }
}

let store = createStore(help, initialState, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementsByTagName('help-app')[0]
);
