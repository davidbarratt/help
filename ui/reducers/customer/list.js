import Customer from '../../entities/customer.js';

const list = (state = [], action) => {
  let index;

  switch (action.type) {
    case 'CUSTOMER_UPDATE_ALL':

      // Ensure that an arry of nodes was passed into the state action.
      if (!Array.isArray(action.customers)) {
        return state;
      }

      state = [];
      for (let i = 0; i < action.customers.length; i++) {
        if (action.customers[i] instanceof Customer === false) {
          continue;
        }

        state = state.concat(action.customers[i]);
      }

      return state;

    case 'CUSTOMER_UPDATE':
      if (action.customer instanceof Customer === false) {
        return state;
      }

      index = state.findIndex((item) => {
        return item.id === action.customer.id;
      });

      if (index === -1) {
        return state;
      }

      // Remove the existing item from the array and place the new item in
      // its place.
      return [
        ...state.slice(0, index),
        Customer.merge(action.customer, action.data),
        ...state.slice(index + 1)
      ];

    case 'CUSTOMER_ADD':
      if (action.customer instanceof Customer === false) {
        return state;
      }

      return state.concat(action.customer);

    case 'CUSTOMER_REMOVE':
      if (action.customer instanceof Customer === false) {
        return state;
      }

      index = state.findIndex((item) => {
        return item.id === action.customer.id;
      });

      if (index === -1) {
        return state;
      }

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    default:
      return state;
  }
};

export default list;
