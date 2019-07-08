import { combineReducers } from 'redux';
import bets from './bets';
import myrequests from './myrequests';
import mybets from './mybets';
import modal from './modal';

export default combineReducers({
  bets,
  myrequests,
  mybets,
  modal,
});
