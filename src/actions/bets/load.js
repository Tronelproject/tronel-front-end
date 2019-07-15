import types from 'Root/actions';
import store from 'Root/store';

export default (bets) => {
  store.dispatch({
    type: types.bets.LOAD,
    bets: bets.filter(
      bet => bet.creator !== global.tronWeb.defaultAddress.base58
      && !bets.done
      && !bet.disabled
      && bet.acceptor === 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'
      && bet.specifiedDate * 1000 > Date.now()
      && bet.lockTime * 1000 > Date.now(),
    ),
  });
};
