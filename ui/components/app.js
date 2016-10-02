import React from 'react';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import CustomerList from './customer/list.js';
import CustomerDuplicates from './customer/duplicates.js';
import CustomerEdit from './customer/edit.js';
import CustomerDelete from './customer/delete.js';

const App = () => (
  <div>
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

    <hr/>

    <Match exactly pattern="/" component={CustomerList} />
    <Match exactly pattern="/customer/duplicates" component={CustomerDuplicates} />
    <Match pattern="/customer/:id/edit" component={CustomerEdit} />
    <Match pattern="/customer/:id/delete" component={CustomerDelete} />
  </div>
);

export default App;
