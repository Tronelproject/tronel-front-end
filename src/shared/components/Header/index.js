import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import SideNav from './SideNav';
import {homePage} from 'Root/constants/routes';
import Nav from './Nav';
import classNames from 'classnames';
import styles from './styles.less';

const Header = () => (
    <Fragment>
      <nav className={classNames(styles.nav,
          'navbar navbar-expand-xl py-xl-0 py-lg-3 py-md-3 py-sm-3 py-3 ')}>
        <Link className="navbar-brand" to={homePage}>
          <img src={require('Root/assets/images/tronel-white.png')}
               alt="logo" width="29px" height="36px"/>
        </Link>
        <div className="collapse navbar-collapse">
          <Nav/>
          <div className={styles['balance-box']}>
            <h6 className={styles.trx}>100 TRX</h6>
            <h6 className={styles.balance}>
              <span>
                <img src={require('Root/assets/images/diamonds.png')}
                     alt="Balance" width="14px" height="14.7px"/>
              </span>
              <span className="pl-2">Balance</span>
            </h6>
          </div>
        </div>
      </nav>
      <SideNav/>
    </Fragment>
);

export default Header;
