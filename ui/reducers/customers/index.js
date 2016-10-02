import { combineReducers } from 'redux';
import list from './list.js';

const customers = combineReducers({
  list
});

export default customers;
