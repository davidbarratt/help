import Customer from '../../../entities/customer.js';

const list = (state = [], action) => {
  switch (action.type) {
    case 'CUSTOMER_DUPLICATES_UPDATE_ALL':

      // Ensure that an arry of nodes was passed into the state action.
      if (!Array.isArray(action.customers)) {
        return state;
      }

      state = [];
      for (let i = 0; i < action.customers.length; i++) {
        if (action.customers[i] instanceof Customer === false) {
          continue;
        }

        state = state.concat(action.customers[i].id);
      }

      return state;

    default:
      return state;
  }
};

export default list;
