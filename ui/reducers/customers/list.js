import Customer from '../../entities/customer.js';

const list = (state = [], action) => {
  switch (action.type) {
    case 'CUSTOMER_ADD_MULTIPLE':

      // Ensure that an arry of nodes was passed into the state action.
      if (!Array.isArray(action.customers)) {
        return state;
      }

      for (let i = 0; i < action.customers.length; i++) {
        if (action.customers[i] instanceof Customer === false) {
          continue;
        }

        // Find any existing nodes with the same id.
        let index = state.findIndex((item) => {
          return item.id === action.customers[i].id;
        });

        // Remove the existing item from the array.
        if (index !== -1) {
          state = [
            ...state.slice(0, index),
            ...state.slice(index + 1)
          ];
        }

        // If no existing node is found, add the node to the list and update the
        // sort.
        state = state.concat(action.customers[i]).sort((a, b) => {
          if (a.id === b.id) {
            return 0;
          }

          return (a.id < b.id) ? -1 : 1;
        });
      }

      return state;
    default:
      return state;
  }
};

export default list;
