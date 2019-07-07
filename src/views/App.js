import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Explorer from './Explorer';
import MyRequests from './MyRequests';
import MyBets from './MyBets';
import CreateRequest from './CreateRequest';
import 'rc-dropdown/assets/index.css';
import 'rc-slider/assets/index.css';
import 'rc-menu/assets/index.css';
import 'Root/styles/base.less';
import {
  explorerRoute,
  myRequestRoute,
  createRequestRoute,
  myBetRoute,
} from 'Root/constants/routes';

export default () => (
    <Switch>
      <Route path={explorerRoute} exact component={Explorer}/>
      <Route path={myBetRoute} exact component={MyBets}/>
      <Route path={myRequestRoute} exact component={MyRequests}/>
      <Route path={createRequestRoute} exact component={CreateRequest}/>
      <Redirect to={explorerRoute}/>
    </Switch>
);
