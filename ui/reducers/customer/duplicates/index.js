import { combineReducers } from 'redux';
import list from './list.js';
import status from './status.js';

const duplicates = combineReducers({
  list,
  status
});

export default duplicates;
