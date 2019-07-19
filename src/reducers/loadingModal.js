import types from 'Root/actions';

export default (state = false, action) => {
  switch (action.type) {
    case types.loadingModal.SHOW: {
      return true;
    }

    case types.loadingModal.HIDE: {
      return false;
    }

    default: {
      return state;
    }
  }
};
