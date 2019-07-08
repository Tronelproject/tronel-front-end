import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import BasicModal from 'Root/shared/components/Modal';
import history from 'Root/history';
import store from 'Root/store';
import App from './App';

export default (props) => (
  <Provider store={store}>
    <Router history={history}>
      <App />
      <BasicModal />
    </Router>
  </Provider>
);
