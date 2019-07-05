import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.bets.LOAD: {
      return action.bets;
    }

    case types.bets.REMOVE: {
      const index = state.findIndex(i => i.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }

    default: {
      return state;
    }
  }
};
