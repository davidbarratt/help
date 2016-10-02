import React, { PropTypes } from 'react';
import Customer from '../../../../entities/customer.js';
import Email from '../../../../entities/email.js';

class CustomerEditEmail extends React.Component {
  updateEmail (event) {
    this.props.updateEmail(this.props.customer, this.props.index, event.target.value);
  }
  removeEmail (event) {
    this.props.removeEmail(this.props.customer, this.props.index);
  }
  render () {
    let email = this.props.email;
    return (
      <div className="input-group">
        <input type="email" className="form-control" value={email.email} onChange={this.updateEmail.bind(this)} />
        <span className="input-group-btn">
            <button className='btn btn-danger btn-remove' type="button" onClick={this.removeEmail.bind(this)}>
                <span className='glyphicon glyphicon-minus'></span>
            </button>
        </span>
      </div>
    );
  }
}

CustomerEditEmail.propTypes = {
  customer: PropTypes.instanceOf(Customer).isRequired,
  index: PropTypes.number.isRequired,
  email: PropTypes.instanceOf(Email).isRequired,
  updateEmail: PropTypes.func.isRequired,
  removeEmail: PropTypes.func.isRequired
};

export default CustomerEditEmail;
