import { connect } from 'react-redux';
import CustomerEdit from './index.js';
import CustomerActions from '../../../actions/customer.js';

const mapStateToProps = (state, ownProps) => {
  let id = parseInt(ownProps.params.id);
  let customer = state.customer.list.find((customer) => {
    return customer.id === id;
  });
  return {
    baseUrl: state.baseUrl,
    customer: customer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
      dispatch(actions.saveCustomer(customer));
    }
  };
};

const CustomerEditContainer = connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);

export default CustomerEditContainer;
