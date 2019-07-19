import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import removeFromBets from 'Root/actions/bets/remove';
import config from 'Root/config';

export default async (id) => {
  store.dispatch({
    type: types.loadingModal.SHOW,
  });

  const bet = store.getState().bets.find(i => i._id === id);

  try {
    const factory = await global.tronWeb.contract().at(config.factory);
    await factory.accept(bet.contractIndex).send({
      callValue: bet.betAmount,
      shouldPollResponse: true,
    });
  } catch (e) {
    store.dispatch({
      type: types.loadingModal.HIDE,
    });

    return;
  }

  const res = await fetch(`/bets/${id}/accept`, {
    method: 'PUT',
  });

  if (!res) {
    return;
  }

  store.dispatch({
    type: types.mybets.ACCEPT,
    bet,
  });

  store.dispatch({
    type: types.loadingModal.HIDE,
  });

  removeFromBets(id);
};
