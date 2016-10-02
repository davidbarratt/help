import { connect } from 'react-redux';
import CustomerList from './list/index.js';
import CustomerDuplicatesAction from '../../actions/customer/duplicates.js';

const mapStateToProps = (state) => {
  let customers = [];
  let list = state.customer.duplicates.list;

  for (let i = 0; i < list.length; i++) {
    let customer = state.customer.list.find((item) => {
      return item.id === list[i];
    });

    if (typeof customer !== 'undefined') {
      customers.push(customer);
    }
  }

  return {
    baseUrl: state.baseUrl,
    customers: customers,
    status: state.customer.duplicates.status
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCustomers: (baseUrl) => {
      let actions = new CustomerDuplicatesAction(baseUrl);
      dispatch(actions.getDuplicates());
    }
  };
};

const CustomerDuplicates = connect(mapStateToProps, mapDispatchToProps)(CustomerList);

export default CustomerDuplicates;
