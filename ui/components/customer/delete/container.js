import { connect } from 'react-redux';
import CustomerEdit from './index.js';
import CustomerActions from '../../../actions/customer/index.js';

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
    deleteCustomer: (baseUrl, customer) => {
      let actions = new CustomerActions(baseUrl);
      dispatch(actions.deleteCustomer(customer));
    }
  };
};

const CustomerEditContainer = connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);

export default CustomerEditContainer;
