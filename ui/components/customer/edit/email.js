import React, { PropTypes } from 'react';
import Email from '../../../entities/email.js';

class CustomerEditEmail extends React.Component {
  render () {
    let email = this.props.email;
    return (
      <div className="input-group">
        <input type="email" className="form-control" value={email.email} />
        <span className="input-group-btn">
            <button className='btn btn-danger btn-remove' type="button">
                <span className='glyphicon glyphicon-minus'></span>
            </button>
        </span>
      </div>
    );
  }
}

CustomerEditEmail.propTypes = {
  email: PropTypes.instanceOf(Email).isRequired,
  index: PropTypes.number.isRequired
};

export default CustomerEditEmail;
