import React, {Fragment} from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import {Link} from 'react-router-dom';

export default () => (
    <Fragment>
      <button className={classNames(styles['nav-link-btn'], 'btn')}>
        <Link className="nav-link"
              to="/test">
          <span className="icon-plus pr-2"/>
          <span>Create request</span>
        </Link>
      </button>
    </Fragment>
);
