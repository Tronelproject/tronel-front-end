import types from 'Root/actions';
import store from 'Root/store';
import tronweb from 'Root/tronweb';

export default (bets) => {
  store.dispatch({
    type: types.mybets.LOAD,
    bets: bets.filter(
      bet => bets.acceptor !== 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'
      && bet.creator === tronweb.defaultAddress.base58,
    ),
  });
};
