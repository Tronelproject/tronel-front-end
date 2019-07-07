import { combineReducers } from 'redux';
import bets from './bets';
import myrequests from './myrequests';
import mybets from './mybets';

export default combineReducers({
  bets,
  myrequests,
  mybets,
});
