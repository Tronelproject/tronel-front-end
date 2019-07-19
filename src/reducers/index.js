import { combineReducers } from 'redux';
import bets from './bets';
import myrequests from './myrequests';
import mybets from './mybets';
import modal from './modal';
import user from './user';
import loadingModal from './loadingModal';

export default combineReducers({
  bets,
  myrequests,
  mybets,
  modal,
  user,
  loadingModal,
});
