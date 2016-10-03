import React from 'react';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from '../components/app.js';
import help from '../reducers/index.js';
import CustomerAction from '../actions/customer/index.js';
import CustomerDuplicatesAction from '../actions/customer/duplicates.js';
import { setBaseUrl } from '../actions/index.js';

class CustomerController {

  constructor () {
    this.initialState = {
      baseUrl: 'http://server'
    };
  }

  allCustomers (request, reply) {
    let store = this.generateStore(this.initialState);
    let actions = new CustomerAction(store.getState().baseUrl);

    store.dispatch(actions.getCustomers()).then((customers) => {
      return reply(this.render(request, store));
    });
  }

  duplicateCustomers (request, reply) {
    let store = this.generateStore(this.initialState);
    let actions = new CustomerAction(store.getState().baseUrl);
    let duplicateActions = new CustomerDuplicatesAction(store.getState().baseUrl);

    store.dispatch(actions.getCustomers()).then((customers) => {
      return store.dispatch(duplicateActions.getDuplicates());
    }).then((duplicates) => {
      return reply(this.render(request, store));
    });
  }

  getBaseUrl (request) {
    let protocol = request.headers['x-forwarded-proto'] || request.server.info.protocol;
    let host = request.headers['x-forwarded-host'] || request.headers.host;
    return protocol + '://' + host;
  }

  generateStore (initialState) {
    return createStore(help, initialState, applyMiddleware(thunk));
  }

  render (request, store) {
    store.dispatch(setBaseUrl(this.getBaseUrl(request)));
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Help</title>
          <script type="application/json" id="state">` + JSON.stringify(store.getState()) + `</script>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
        </head>
        <body>
          <div class="container">
            <help-app>` + this.reactReander(request, store) + `</help-app>
          </div>
          <script src="/static/js/app.js" type="text/javascript"></script>
        </body>
      </html>
    `;
  }

  reactReander (request, store) {
    let context = createServerRenderContext();
    return renderToString(
      <Provider store={store}>
        <ServerRouter location={request.url.path} context={context}>
          <App />
        </ServerRouter>
      </Provider>
    );
  }

}

module.exports = CustomerController;
