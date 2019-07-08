import types from 'Root/actions';

export default (state = false, action) => {
  switch (action.type) {
    case types.modal.SHOW: {
      return true;
    }

    case types.modal.HIDE: {
      return false;
    }

    default: {
      return state;
    }
  }
};
