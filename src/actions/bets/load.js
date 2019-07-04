import types from 'Root/actions';
import store from 'Root/store';

export default (bets) => {
  store.dispatch({
    type: types.bets.LOAD,
    bets: bets.filter(
      bet => bet.creator !== global.tronWeb.defaultAddress.base58,
    ),
  });
};
