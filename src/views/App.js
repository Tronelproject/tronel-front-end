import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import 'rc-dropdown/assets/index.css';
import 'rc-slider/assets/index.css';
import 'rc-menu/assets/index.css'
import 'Root/styles/base.less';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);
