import types from 'Root/actions';

export default (state = { address: '', balance: 0 }, action) => {
  switch (action.type) {
    case types.user.LOAD: {
      return action.user;
    }

    default: {
      return state;
    }
  }
};
