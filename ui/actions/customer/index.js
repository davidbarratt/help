import CustomerNormalizer from '../../normalizers/customer.js';
import ClientRequest from '../../requests/client.js';
import Email from '../../entities/email.js';
import CustomerDuplicatesAction from './duplicates.js';

class CustomerAction {

  /**
   * @TODO Dependencies should use dependency injection.
   */
  constructor (baseUrl = '') {
    this.request = new ClientRequest(baseUrl);
    this.normalizer = new CustomerNormalizer();
  }

  updateAllCustomers (customers) {
    return {
      type: 'CUSTOMER_UPDATE_ALL',
      customers: customers
    };
  }

  updateCustomer (customer, data = {}) {
    // If the state is undefined, we'll assume it's dirty.
    if (typeof data.state === 'undefined') {
      data.state = 'dirty';
    }
    return {
      type: 'CUSTOMER_UPDATE',
      customer: customer,
      data: data
    };
  }

  createEmail (customer) {
    let data = {
      emails: customer.emails
    };
    data.emails.push(new Email());

    return this.updateCustomer(customer, data);
  }

  updateEmail (customer, index, email) {
    let data = {
      emails: customer.emails
    };

    data.emails[index].email = email;

    return this.updateCustomer(customer, data);
  }

  removeEmail (customer, index) {
    let data = {};

    data.emails = [
      ...customer.emails.slice(0, index),
      ...customer.emails.slice(index + 1)
    ];

    return this.updateCustomer(customer, data);
  }

  saveCustomer (customer) {
    return (dispatch) => {
      return this.request.patch('/api/customer/' + customer.id, customer)
        .then((data) => {
          let updated = this.normalizer.normalize(data);
          let duplicates = new CustomerDuplicatesAction(this.baseUrl);
          dispatch(this.updateCustomer(customer, updated));
          dispatch(this.getCustomers());
          dispatch(duplicates.setStatusStale());
          return updated;
        })
        .catch((e) => {
          // Do nothing, but throw a console error.
          dispatch(this.updateCustomer(customer, {
            state: 'error'
          }));
          console.log(e);
          return customer;
        });
    };
  }

  getCustomers () {
    return (dispatch) => {
      dispatch(this.setStatusRetrieving());
      return this.request.get('/api/customer')
      .then((data) => {
        if (!Array.isArray(data)) {
          return [];
        }

        let customers = [];
        for (let i = 0; i < data.length; i++) {
          customers.push(this.normalizer.normalize(data[i]));
        }

        dispatch(this.updateAllCustomers(customers));
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
