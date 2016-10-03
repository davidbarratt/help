import React, { PropTypes } from 'react';
import Customer from '../../../entities/customer.js';
import Link from 'react-router/Link';

class CustomerListItem extends React.Component {

  /**
   * The dropdown toggle is only part of the view layer and should not be
   * included in the global state.
   */
  constructor (props) {
    super(props);
    this.state = {
      operationsMenu: 0
    };
  }

  toggleDropdown () {
    this.setState({
      operationsMenu: this.state.operationsMenu ? 0 : 1
    });
  }

  render () {
    let customer = this.props.customer;
    let rowClass = '';

    switch (customer.state) {
      case 'dirty':
        rowClass = 'warning';
        break;
      case 'error':
        rowClass = 'danger';
        break;
      case 'removing':
        rowClass = 'info';
        break;
      case 'creating':
        rowClass = 'info';
        break;
    }

    let operations;

    // New Customers do not have operations.
    if (customer.id === 0) {
      operations = (
        <div className='btn-group'>
          <Link to={'/customer/new'}>{
            ({isActive, location, href, onClick, transition}) =>
                <button type="button" className="btn" onClick={onClick}>Edit</button>
            }</Link>
        </div>
      );
    } else {
      operations = (
        <div className={this.state.operationsMenu ? 'btn-group open' : 'btn-group'}>
          <Link to={'/customer/' + customer.id + '/edit'}>{
            ({isActive, location, href, onClick, transition}) =>
                <button type="button" className="btn" onClick={onClick}>Edit</button>
            }</Link>
          <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleDropdown.bind(this)}>
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li><Link to={'/customer/' + customer.id + '/delete'}>Delete</Link></li>
          </ul>
        </div>
      );
    }

    return (
      <tr className={rowClass}>
        <td>{customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>
          {customer.emails.map((email, index) => {
            return (
              <div key={index}>
                {email.email}
              </div>
            );
          })}
        </td>
        <td>
          {operations}
        </td>
      </tr>
    );
  }
}

CustomerListItem.propTypes = {
  customer: PropTypes.instanceOf(Customer)
};

export default CustomerListItem;
