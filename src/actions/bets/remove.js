import types from 'Root/types';
import store from 'Root/store';

export default (id) => {
  store.dispatch({
    type: types.bets.REMOVE,
    id,
  });
};
