import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import loadBets from 'Root/actions/bets/load';
import loadMyBets from 'Root/actions/mybets/load';
import loadMyRequests from 'Root/actions/myrequests/load';
import getBets from 'Root/helpers/getBets';
import App from './views';

(async () => {
  render(
    <App />,
    global.document.getElementById('root'),
  );

  if (!global.tronWeb) {
    // show alert
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
})();

if (module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') {
      console.clear();
    }
  });
}
