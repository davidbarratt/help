const status = (state = 'stale', action) => {
  switch (action.type) {
    case 'CUSTOMER_DUPLICATES_STATUS_SET_READY':
      return 'ready';
    case 'CUSTOMER_DUPLICATES_STATUS_SET_RETRIEVING':
      return 'retrieving';
    case 'CUSTOMER_DUPLICATES_STATUS_SET_STALE':
      return 'stale';
    default:
      return state;
  }
};

export default status;
