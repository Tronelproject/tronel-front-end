import types from 'Root/actions';
import betdata from 'Root/helpers/betdata';
import { manager } from 'Root/config';
import fetch from 'Root/helpers/fetch';
import store from 'Root/store';

export default async (details) => {
  let res;
  try {
    res = await global.tronWeb.contract().new({
      ...betdata,
      userFeePercentage: 1,
      callValue: details.betAmount,
      shouldPollResponse: true,
      parameters: [
        manager,
        details.currency,
        details.predictPrice,
        details.predictTime,
        details.predictType,
      ],
    });
  } catch (e) {
    return;
  }

  const bet = await fetch('/bets', {
    method: 'POST',
    data: JSON.stringify({
      address: global.tronWeb.address.fromHex(res.address),
    }),
  });

  if (!bet) {
    return;
  }

  store.dispatch({
    type: types.myrequests.ADD,
    bet: bet.data,
  });
};
