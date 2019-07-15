import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.mybets.LOAD: {
      return action.bets;
    }

    case types.mybets.ACCEPT: {
      return [
        action.bet,
        ...state,
      ];
    }

    default: {
      return state;
    }
  }
};
