import { combineReducers } from 'redux';
import list from './list.js';
import status from './status.js';

const customers = combineReducers({
  list,
  status
});

export default customers;
