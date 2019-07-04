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

    default: {
      return state;
    }
  }
};
