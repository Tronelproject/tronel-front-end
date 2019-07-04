import types from 'Root/actions';
import store from 'Root/store';
import tronweb from 'Root/tronweb';

export default (bets) => {
  store.dispatch({
    type: types.bets.LOAD,
    bets: bets.filter(
      bet => bet.creator !== tronweb.defaultAddress.base58,
    ),
  });
};
