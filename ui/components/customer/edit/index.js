import React, { PropTypes } from 'react';
import Customer from '../../../entities/customer.js';
import CustomerEditEmail from './email.js';

class CustomerEdit extends React.Component {
  handleChange (event) {
    let data = {
      state: 'dirty'
    };
    data[event.target.name] = event.target.value;
    this.props.updateCustomer(this.props.baseUrl, this.props.customer, data);
  }
  render () {
    let customer = this.props.customer;

    return (
      <form>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" name="firstName" id="firstName" value={customer.firstName} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">First Name</label>
          <input type="text" className="form-control" name="lastName" id="lastName" value={customer.lastName} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group clearfix">
          <label>Emails</label>
          {customer.emails.map((email, index) => {
            return <CustomerEditEmail key={index} index={index} email={email} />;
          })}
        </div>
        <div className="form-group">
          <button className='btn btn-success btn-add btn-xs' type="button">
              <span className='glyphicon glyphicon-plus'></span>
          </button>
        </div>
        <button type="submit" className="btn btn-default">Save</button>
      </form>
    );
  }
}

CustomerEdit.propTypes = {
  customer: PropTypes.instanceOf(Customer).isRequired,
  baseUrl: PropTypes.string.isRequired,
  updateCustomer: PropTypes.func.isRequired
};

export default CustomerEdit;
