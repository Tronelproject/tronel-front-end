import types from 'Root/actions';
import fetch from 'Root/helpers/fetch';
import store from 'Root/store';

export default async (id) => {
  const address = store.getState().myrequests.find(i => i.id === id).address;
  try {
    const betContract = await global.tronWeb.contract().at(address);
    await betContract.disable().send({
      shouldPollResponse: true,
    });
  } catch (e) {
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
};
