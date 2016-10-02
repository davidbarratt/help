import { combineReducers } from 'redux';
import baseUrl from './base-url.js';
import customer from './customer/index.js';

const help = combineReducers({
  baseUrl,
  customer
});

export default help;
