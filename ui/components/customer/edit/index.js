import React, { PropTypes } from 'react';
import Redirect from 'react-router/Redirect';
import Customer from '../../../entities/customer.js';
import CustomerEditEmailContainer from './email/container.js';

class CustomerEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleChange (event) {
    let data = {};
    data[event.target.name] = event.target.value;
    this.props.updateCustomer(this.props.customer, data);
  }
  handleSubmit (event) {
    event.preventDefault();
    this.props.saveCustomer(this.props.baseUrl, this.props.customer);
    this.setState({
      redirect: true
    });
  }
  createEmail (event) {
    this.props.createEmail(this.props.customer);
  }
  componentDidMount () {
    this.props.initCustomer(this.props.customer);
  }
  render () {
    let customer = this.props.customer;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" name="firstName" id="firstName" value={customer.firstName} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" className="form-control" name="lastName" id="lastName" value={customer.lastName} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group clearfix">
          <label>Emails</label>
          {customer.emails.map((email, index) => {
            return <CustomerEditEmailContainer key={index} index={index} customer={customer} email={email} />;
          })}
        </div>
        <div className="form-group">
          <button className='btn btn-success btn-add btn-xs' type="button" onClick={this.createEmail.bind(this)}>
              <span className='glyphicon glyphicon-plus'></span>
          </button>
        </div>
        <button type="submit" className="btn btn-default">Save</button>
      </form>
    );
  }
}

CustomerEdit.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  customer: PropTypes.instanceOf(Customer).isRequired,
  initCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  createEmail: PropTypes.func.isRequired,
  saveCustomer: PropTypes.func.isRequired
};

export default CustomerEdit;
