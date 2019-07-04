import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.mybets.LOAD: {
      return action.bets;
    }

    default: {
      return state;
    }
  }
};
