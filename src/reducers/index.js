import { combineReducers } from 'redux';
import bets from './bets';
import myrequests from './myrequests';
import mybets from './mybets';
import modal from './modal';
import user from './user';

export default combineReducers({
  bets,
  myrequests,
  mybets,
  modal,
  user,
});
