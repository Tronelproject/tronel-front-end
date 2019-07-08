import types from 'Root/actions';
import store from 'Root/store';

export default (bets) => {
  store.dispatch({
    type: types.mybets.LOAD,
    bets: bets.filter(
      bet => bet.acceptor !== 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'
      && bet.creator === global.tronWeb.defaultAddress.base58,
    ),
  });
};
