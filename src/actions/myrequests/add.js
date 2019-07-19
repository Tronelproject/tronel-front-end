import types from 'Root/actions';
import config from 'Root/config';
import fetch from 'Root/helpers/fetch';
import store from 'Root/store';

export default async (details) => {
  store.dispatch({
    type: types.loadingModal.SHOW,
  });

  let res;
  try {
    const factory = await global.tronWeb.contract().at(config.factory);

    res = await factory.createBet(
      details.currency,
      details.predictionPrice * 10000,
      Math.floor(details.specifiedDate / 1000),
      Math.floor(details.lockTime / 1000),
      details.predictionType,
      details.betAmount * 1000000,
    ).send({
      callValue: details.betAmount * 1000000,
      shouldPollResponse: true,
    });
  } catch (e) {
    store.dispatch({
      type: types.loadingModal.HIDE,
    });

    return;
  }

  const bet = await fetch('/bets', {
    method: 'POST',
    body: JSON.stringify({
      contractIndex: res.toNumber(),
    }),
  });

  if (!bet) {
    return;
  }

  store.dispatch({
    type: types.myrequests.ADD,
    bet: bet.data,
  });

  store.dispatch({
    type: types.loadingModal.HIDE,
  });
};
