import React, { PropTypes } from 'react';
import Customer from '../../../entities/customer.js';
import Link from 'react-router/Link';
import Redirect from 'react-router/Redirect';

class CustomerDelete extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.deleteCustomer(this.props.baseUrl, this.props.customer);
    this.setState({
      redirect: true
    });
  }

  render () {
    let customer = this.props.customer;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Are you aure you want to delete <em>{customer.firstName} {customer.lastName}</em>?</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <button type="submit" className="btn btn-danger">Delete</button>
              <Link to="/" className="btn btn-link">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CustomerDelete.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  customer: PropTypes.instanceOf(Customer).isRequired,
  deleteCustomer: PropTypes.func.isRequired
};

export default CustomerDelete;
