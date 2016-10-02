import CustomerNormalizer from '../../normalizers/customer.js';
import ClientRequest from '../../requests/client.js';

class CustomerDuplicatesAction {

  /**
   * @TODO Dependencies should use dependency injection.
   */
  constructor (baseUrl = '') {
    this.request = new ClientRequest(baseUrl);
    this.normalizer = new CustomerNormalizer();
  }

  updateDuplicates (customers) {
    return {
      type: 'CUSTOMER_DUPLICATES_UPDATE_ALL',
      customers: customers
    };
  }

  getDuplicates () {
    return (dispatch) => {
      dispatch(this.setStatusRetrieving());
      return this.request.get('/api/customer/duplicates')
      .then((data) => {
        if (!Array.isArray(data)) {
          return [];
        }

        let customers = [];
        for (let i = 0; i < data.length; i++) {
          customers.push(this.normalizer.normalize(data[i]));
        }

        dispatch(this.updateDuplicates(customers));
        dispatch(this.setStatusReady());
        return customers;
      }).catch((e) => {
        console.log(e);
        dispatch(this.setStatusStale());
        return [];
      });
    };
  }

  setStatusRetrieving () {
    return {
      type: 'CUSTOMER_DUPLICATES_STATUS_SET_RETRIEVING'
    };
  }

  setStatusReady () {
    return {
      type: 'CUSTOMER_DUPLICATES_STATUS_SET_READY'
    };
  }

  setStatusStale () {
    return {
      type: 'CUSTOMER_DUPLICATES_STATUS_SET_STALE'
    };
  }
}

export default CustomerDuplicatesAction;
