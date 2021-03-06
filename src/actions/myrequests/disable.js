import types from 'Root/actions';
import fetch from 'Root/helpers/fetch';
import store from 'Root/store';
import config from 'Root/config';

export default async (id) => {
  store.dispatch({
    type: types.loadingModal.SHOW,
  });

  const contractIndex = store.getState().myrequests.find(i => i._id === id).contractIndex;
  try {
    const factory = await global.tronWeb.contract().at(config.factory);
    await factory.disableBet(contractIndex).send({
      shouldPollResponse: true,
    });
  } catch (e) {
    store.dispatch({
      type: types.loadingModal.HIDE,
    });

    return;
  }

  const bet = await fetch(`/bets/${id}/disable`, {
    method: 'PUT',
  });

  if (!bet) {
    return;
  }

  store.dispatch({
    type: types.myrequests.DISABLE,
    id,
  });

  store.dispatch({
    type: types.loadingModal.HIDE,
  });
};
