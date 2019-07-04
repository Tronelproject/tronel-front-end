import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.myrequests.LOAD: {
      return action.bets;
    }

    case types.myrequests.ADD: {
      return [
        ...state,
        action.bet,
      ];
    }

    case types.myrequests.DISABLE: {
      const index = state.findIndex(i => i.id === action.id);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          disable: true,
        },
        ...state.slice(index + 1),
      ];
    }

    default: {
      return state;
    }
  }
};
