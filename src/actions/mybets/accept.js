import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import removeFromBets from 'Root/actions/bets/remove';

export default async (id) => {
  const bet = store.getState().bets.find(i => i.id === id);

  try {
    const contract = await global.tronWeb.contract().at(bet.address);
    await contract.join().send({
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
