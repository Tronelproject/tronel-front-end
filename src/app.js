import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import loadBets from 'Root/actions/bets/load';
import loadMyBets from 'Root/actions/mybets/load';
import loadMyRequests from 'Root/actions/myrequests/load';
import getBets from 'Root/helpers/getBets';
import App from './views';

let modal = false;

(async () => {

  if (!global.tronWeb) {
    // show alert
    modal = true;
    setTimeout(() => {
      modal = false;
    }, 3000);
    console.error('there is no tronlink');
  } else {
    const bets = await getBets();

    if (!bets) {
      // server error;
      return;
    }

    loadBets(bets.data);
    loadMyBets(bets.data);
    loadMyRequests(bets.data);
  }

  render(
      <App modal={modal}/>,
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
