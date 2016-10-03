const baseUrl = (state, action) => {
  if (typeof state === 'undefined') {
    state = '';

    if (typeof window !== 'undefined') {
      state = window.location.protocol + '//' + window.location.host;
    }
  }
  switch (action.type) {
    case 'BASE_URL_SET':
      return action.baseUrl;
    default:
      return state;
  }
};

export default baseUrl;
