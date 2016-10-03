import { connect } from 'react-redux';
import CustomerEdit from './edit/index.js';
import CustomerActions from '../../actions/customer/index.js';

const mapStateToProps = (state, ownProps) => {
  return {
    baseUrl: state.baseUrl,
    customer: state.customer.draft
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initCustomer: (customer) => {
      let actions = new CustomerActions();
      dispatch(actions.removeCustomer(customer));
    },
    updateCustomer: (customer, data) => {
      let actions = new CustomerActions();
      dispatch(actions.updateCustomer(customer, data));
    },
    createEmail: (customer) => {
      let actions = new CustomerActions();
      dispatch(actions.createEmail(customer));
    },
    saveCustomer: (baseUrl, customer) => {
      let actions = new CustomerActions(baseUrl);
      dispatch(actions.createCustomer(customer));
    }
  };
};

const CustomerNew = connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);

export default CustomerNew;
