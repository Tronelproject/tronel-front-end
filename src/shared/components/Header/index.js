import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import SideNav from './SideNav';
import logo from 'Root/assets/images/tronel-white.png';
import diamonds from 'Root/assets/images/diamonds.png';
import {homePage} from 'Root/constants/routes';
import Nav from './Nav';
import classNames from 'classnames';
import styles from './styles.less';

const Header = () => (
    <Fragment>
      <nav className={classNames(styles.nav,
          'navbar navbar-expand-lg py-xl-0 py-lg-0 py-md-3 py-sm-3 py-3 ')}>
        <Link className="navbar-brand ml-xl-0 ml-lg-0 ml-md-auto ml-sm-auto ml-auto" to={homePage}>
          <img src={logo} alt="logo" width="29px" height="36px"/>
        </Link>
        <div className="collapse navbar-collapse">
          <Nav/>
          <div className={styles['balance-box']}>
            <h6 className={styles.trx}>100 TRX</h6>
            <h6 className={styles.balance}>
              <span>
                <img src={diamonds}
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
