import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.less';
import {
  explorerRoute,
  myRequestRoute,
  myBetRoute,
} from 'Root/constants/routes';
import NavButton from 'Root/shared/components/Header/NavButton';
import CopyText from 'Root/shared/components/CopyText';
import shorter from 'Root/helpers/shorter';
import {connect} from 'react-redux';

const address = 'TJWzn8rjLYbfS3hcAVVscLeERUs6rfMoA5';

const Nav = (props) => (
    <Fragment>
      <ul className={classNames(styles['navbar-nav'], 'navbar-nav mr-auto')}>
        <li className="nav-item">
          <NavLink className="nav-link" exact={true}
                   activeClassName='nav-is-active'
                   to={explorerRoute}>Explorer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"
                   activeClassName='nav-is-active'
                   to={myBetRoute}>My Bets</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"
                   activeClassName='nav-is-active'
                   to={myRequestRoute}>My Requests</NavLink>
        </li>
        <li className={classNames(styles['nav-item-btn'], 'nav-item')}>
          <NavButton/>
        </li>
        <li className="nav-item">
          <div className={classNames(styles.address,
              styles['show-text'])}>
            <span className={styles['address-title']}>Address : </span>
            <span className={classNames(styles.copy, 'pl-2')}>
              {props.user.address.length > 17 ?
                  (props.user.address.slice(0, 16) + '...') :
                  props.user.address}
              <span className="pl-3">
                <CopyText text={props.user.address}/>
              </span>
            </span>
          </div>
          <div className={classNames(styles.address, styles['hide-text'])}>
            <span className={styles['address-title']}>Address : </span>
            <span className={classNames(styles.copy, 'pl-2')}>
              {props.user.address.slice(0,4) + '...'}
              <span className="pl-3">
                <CopyText text={props.user.address}/>
              </span>
            </span>
          </div>
        </li>
      </ul>
    </Fragment>
);

export default connect(state => ({user: state.user}))(Nav);
