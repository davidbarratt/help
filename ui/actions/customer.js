import CustomerNormalizer from '../normalizers/customer.js';
import ClientRequest from '../requests/client.js';

class CustomerAction {

  /**
   * @TODO Dependencies should use dependency injection.
   */
  constructor (baseUrl) {
    this.request = new ClientRequest(baseUrl);
    this.normalizer = new CustomerNormalizer();
  }

  updateAllCustomers (customers) {
    return {
      type: 'CUSTOMER_UPDATE_ALL',
      customers: customers
    };
  }

  updateCustomer (customer, data) {
    return {
      type: 'CUSTOMER_UPDATE',
      customer: customer,
      data: data
    };
  }

  getCustomers () {
    return (dispatch) => {
      dispatch(this.setStatusRetrieving());
      return new Promise((resolve, reject) => {
        this.request.get('/api/customer')
        .then((data) => {
          if (!Array.isArray(data)) {
            reject([]);
          }

          let customers = [];
          for (let i = 0; i < data.length; i++) {
            customers.push(this.normalizer.normalize(data[i]));
          }

          dispatch(this.updateAllCustomers(customers));
          dispatch(this.setStatusReady());
          return resolve(customers);
        }).catch((e) => {
          console.log(e);
          dispatch(this.setStatusStale());
          return resolve([]);
        });
      });
    };
  }

  setStatusRetrieving () {
    return {
      type: 'CUSTOMER_STATUS_SET_RETRIEVING'
    };
  }

  setStatusReady () {
    return {
      type: 'CUSTOMER_STATUS_SET_READY'
    };
  }

  setStatusStale () {
    return {
      type: 'CUSTOMER_STATUS_SET_STALE'
    };
  }

}

export default CustomerAction;
