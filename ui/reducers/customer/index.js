import { combineReducers } from 'redux';
import list from './list.js';
import status from './status.js';
import duplicates from './duplicates/index.js';
import draft from './draft.js';

const customers = combineReducers({
  list,
  status,
  duplicates,
  draft
});

export default customers;
