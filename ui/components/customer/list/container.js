import { connect } from 'react-redux';
import CustomerList from './index.js';
import CustomerActions from '../../../actions/customer/index.js';

const mapStateToProps = (state) => {
  return {
    baseUrl: state.baseUrl,
    customers: state.customer.list,
    status: state.customer.status
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCustomers: (baseUrl) => {
      let actions = new CustomerActions(baseUrl);
      dispatch(actions.getCustomers());
    }
  };
};

const CustomerListContainer = connect(mapStateToProps, mapDispatchToProps)(CustomerList);

export default CustomerListContainer;
