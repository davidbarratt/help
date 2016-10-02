import { combineReducers } from 'redux';
import list from './list.js';
import status from './status.js';
import duplicates from './duplicates/index.js';

const customers = combineReducers({
  list,
  status,
  duplicates
});

export default customers;
