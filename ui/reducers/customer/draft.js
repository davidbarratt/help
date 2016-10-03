import Customer from '../../entities/customer.js';
import Email from '../../entities/email.js';

const stubCustomer = () => {
  let data = {
    state: 'draft',
    emails: [
      new Email()
    ]
  };
  return Customer.create(data);
};

const draft = (state, action) => {
  if (typeof state === 'undefined') {
    state = stubCustomer();
  }
  switch (action.type) {
    case 'CUSTOMER_DRAFT_UPDATE':
      return Customer.merge(state, action.data);
    case 'CUSTOMER_DRAFT_CLEAR':
      return stubCustomer();
    default:
      return state;
  }
};

export default draft;
