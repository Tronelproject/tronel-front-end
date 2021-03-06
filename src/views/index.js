import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import BasicModal from 'Root/shared/components/Modal';
import history from 'Root/history';
import store from 'Root/store';
import App from './App';
import LoadingModal from './LoadingModal';

export default (props) => (
  <Provider store={store}>
    <Router history={history}>
      <App />
      <BasicModal
          type={'tronLink'}
          title={'Please open your Tronlink'}
          text={'Haven\'t installed Tronlink yet?'}
      />
      <LoadingModal />
    </Router>
  </Provider>
);
