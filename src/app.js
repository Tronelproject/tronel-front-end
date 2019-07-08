import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import loadBets from 'Root/actions/bets/load';
import loadMyBets from 'Root/actions/mybets/load';
import loadMyRequests from 'Root/actions/myrequests/load';
import getBets from 'Root/helpers/getBets';
import store from 'Root/store';
import types from 'Root/actions';
import App from './views';

async function loadAllStuff() {
  const bets = await getBets();

  if (!bets) {
    return;
  }

  loadBets(bets.data);
  loadMyBets(bets.data);
  loadMyRequests(bets.data);

  const balance = await global.tronWeb.trx.getBalance(global.tronWeb.defaultAddress.base58);
  store.dispatch({
    type: types.user.LOAD,
    user: {
      address: global.tronWeb.defaultAddress.base58,
      balance,
    },
  });

  setInterval(async () => {
    const balance = await global.tronWeb.trx.getBalance(global.tronWeb.defaultAddress.base58);
    store.dispatch({
      type: types.user.LOAD,
      user: {
        address: global.tronWeb.defaultAddress.base58,
        balance,
      },
    });
  }, 2000);
}

(async () => {
  let interval;
  if (!global.tronWeb || !global.tronWeb.ready) {
    store.dispatch({
      type: types.modal.SHOW,
    });

    interval = setInterval(() => {
      if (global.tronWeb && global.tronWeb.ready) {
        loadAllStuff();

        store.dispatch({
          type: types.modal.HIDE,
        });

        clearInterval(interval);
      }
    }, 1000);
  } else {
    await loadAllStuff();
  }

  render(
    <App />,
    global.document.getElementById('root'),
  );
})();

if (module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') {
      console.clear();
    }
  });
}
