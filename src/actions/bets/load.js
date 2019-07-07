import types from 'Root/actions';
import store from 'Root/store';

export default (bets) => {
  store.dispatch({
    type: types.bets.LOAD,
    bets: bets.filter(
      bet => bet.creator !== global.tronWeb.defaultAddress.base58
      && !bets.done
      && !bets.disable
      && bets.acceptor === 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
    ),
  });
};
