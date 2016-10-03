import React from 'react';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import CustomerListContainer from './customer/list/container.js';
import CustomerDuplicates from './customer/duplicates.js';
import CustomerEditContainer from './customer/edit/container.js';
import CustomerDeleteContainer from './customer/delete/container.js';
import CustomerNew from './customer/new.js';

const App = () => (
  <div>
    <div className="row">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Customers</Link>
          </div>

          <ul className="nav navbar-nav">
            <Link to="/customer/duplicates">{
              ({isActive, location, href, onClick, transition}) =>
                <li className={isActive ? 'active' : ''}>
                  <a href={href} onClick={onClick}>Duplicates</a>
                </li>
              }</Link>
          </ul>
        </div>
      </nav>
    </div>

    <div className="row">
      <Match exactly pattern="/" component={CustomerListContainer} />
      <Match pattern="/customer/duplicates" component={CustomerDuplicates} />
      <Match pattern="/customer/new" component={CustomerNew} />
      <Match pattern="/customer/:id/edit" component={CustomerEditContainer} />
      <Match pattern="/customer/:id/delete" component={CustomerDeleteContainer} />
    </div>
  </div>
);

export default App;
