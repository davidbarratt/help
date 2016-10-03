import React, { PropTypes } from 'react';
import Link from 'react-router/Link';
import Customer from '../../../entities/customer.js';
import CustomerListItem from './item.js';

class CustomerList extends React.Component {
  componentDidMount () {
    if (this.props.status === 'stale') {
      this.props.getCustomers(this.props.baseUrl);
    }
  }
  render () {
    return (
      <div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Emails</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {this.props.customers.map((customer) => {
                return <CustomerListItem key={customer.id} customer={customer} />;
              })}
            </tbody>
          </table>
        </div>
        <Link to="/customer/new" className="btn btn-default"><span className='glyphicon glyphicon-plus'></span> New</Link>
      </div>
    );
  }
}

CustomerList.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  getCustomers: PropTypes.func.isRequired,
  customers: PropTypes.arrayOf(PropTypes.instanceOf(Customer))
};

export default CustomerList;
