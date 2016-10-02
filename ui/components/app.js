import React from 'react';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import CustomerList from './customer/list.js';
import CustomerEdit from './customer/edit.js';
import CustomerDelete from './customer/delete.js';

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Customers</Link></li>
      <li><Link to="/customer/1/edit">Edit Customer 1</Link></li>
      <li><Link to="/customer/1/delete">Delete Customer 1</Link></li>
    </ul>

    <hr/>

    <Match exactly pattern="/" component={CustomerList} />
    <Match pattern="/customer/:id/edit" component={CustomerEdit} />
    <Match pattern="/customer/:id/delete" component={CustomerDelete} />
  </div>
);

export default App;
