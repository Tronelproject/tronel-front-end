import React, {Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.less';
import {homePage} from 'Root/constants/routes';
import NavButton from 'Root/shared/components/Header/NavButton';

const Nav = () => (
    <Fragment>
      <ul className={classNames(styles['navbar-nav'], 'navbar-nav mr-auto')}>
        <li className="nav-item">
          <NavLink className="nav-link" exact={true}
                   activeClassName='nav-is-active'
                   to={homePage}>Explorer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"
                   activeClassName='nav-is-active'
                   to="/test">My Bets</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"
                   activeClassName='nav-is-active'
                   to="/test">My Requests</NavLink>
        </li>
        <li className={classNames(styles['nav-item-btn'], 'nav-item')}>
          <NavButton/>
        </li>
        <li className="nav-item">
          <div className={classNames(styles.address, styles['show-text'])}>
            <span className={styles['address-title']}>Address : </span>
            <span className={classNames(styles.copy, 'pl-2')}>
              TJWzn8rjLYbfS3hcAVVscLeERUs6rfMoA5
             <span className="icon-copy pl-3"/>
            </span>
          </div>
          <div className={classNames(styles.address, styles['hide-text'])}>
            <span className={styles['address-title']}>Address : </span>
            <span className={classNames(styles.copy, 'pl-2')}>
              TJWzn8rjLYb...
             <span className="icon-copy pl-3"/>
            </span>
          </div>
        </li>
      </ul>
    </Fragment>
);

export default Nav;
