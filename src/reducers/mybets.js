import types from 'Root/actions';
import store from 'Root/store';

export default (state = [], action) => {
  switch (action.type) {
    case types.mybets.LOAD: {
      return action.bets;
    }

    case types.mybets.ACCEPT: {
      return [
        {
          ...action.bet,
          acceptor: store.getState().user.address,
        },
        ...state,
      ];
    }

    default: {
      return state;
    }
  }
};
