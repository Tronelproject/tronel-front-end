import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import removeFromBets from 'Root/actions/bets/remove';
import config from 'Root/config';

export default async (id) => {
  const bet = store.getState().bets.find(i => i._id === id);

  try {
    const factory = await global.tronWeb.contract().at(config.factory);
    await factory.join(bet.contractIndex).send({
      callValue: bet.betAmount,
      shouldPollResponse: true,
    });
  } catch (e) {
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

  removeFromBets(id);
};
