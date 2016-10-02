import { connect } from 'react-redux';
import CustomerEdit from './index.js';
import CustomerActions from '../../../../actions/customer.js';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateEmail: (customer, index, email) => {
      let actions = new CustomerActions();
      dispatch(actions.updateEmail(customer, index, email));
    },
    removeEmail: (customer, index) => {
      let actions = new CustomerActions();
      dispatch(actions.removeEmail(customer, index));
    }
  };
};

const CustomerEditContainer = connect(undefined, mapDispatchToProps)(CustomerEdit);

export default CustomerEditContainer;
