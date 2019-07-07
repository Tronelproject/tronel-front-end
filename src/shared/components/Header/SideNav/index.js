import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Sidebar from 'react-sidebar';
import classNames from 'classnames';
import styles from './styles.less';
import diamonds from 'Root/assets/images/diamonds.png';
import logo from 'Root/assets/images/tronel-white.png';
import NavButton from 'Root/shared/components/Header/NavButton';
import CopyText from 'Root/shared/components/CopyText';
import {
  explorerRoute,
  myBetRoute,
  myRequestRoute,
} from 'Root/constants/routes';

class SideNav extends Component {
  state = {
    sidebarOpen: false,
    collapse: true,
    rotate: false,
    address: 'TJWzn8rjLYbfS3hcAVVscLeERUs6rfMoA5',
  };

  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open,
    });
  };

  render() {
    return (
        <div className={classNames(styles.sidebar, 'w-100')}>
          <Sidebar
              sidebar={(
                  <div>
                    <div className="container-fluid pt-3">
                      <div className="row">
                        <div className="col-2">
                          <img src={logo} alt="logo" width="29px"
                               height="36px"/>
                        </div>
                        <div className="col-6">
                          <div className={styles['balance-box']}>
                            <h6 className={styles.trx}>100 TRX</h6>
                            <h6 className={styles.balance}>
                                <span>
                                  <img src={diamonds}
                                       alt="Balance" width="14px"
                                       height="14.7px"/>
                                </span>
                              <span className="pl-2">Balance</span>
                            </h6>
                          </div>
                        </div>
                        <div className="col-4">
                          <button
                              className={classNames(styles.close_btn, 'btn')}
                              onClick={() => this.onSetSidebarOpen(false)}
                          >
                            <span className="icon-remove"/>
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="list-group border-0 mt-3">
                      <li className="list-group-item border-0 pt-3">
                        <NavLink
                            exact={true}
                            activeClassName='side-nav-is-active'
                            to={explorerRoute}>
                          {'Explorer'}
                        </NavLink>
                      </li>
                      <li className="list-group-item border-0 pt-3">
                        <NavLink
                            activeClassName='side-nav-is-active'
                            to={myBetRoute}
                        >
                          {'My Bets'}
                        </NavLink>
                      </li>
                      <li className="list-group-item border-0 pt-3">
                        <NavLink
                            activeClassName='side-nav-is-active'
                            to={myRequestRoute}
                        >
                          {'My Requests'}
                        </NavLink>
                      </li>
                      <li className="list-group-item border-0 pt-3">
                        <NavButton/>
                      </li>
                    </ul>
                    <div className={classNames(styles['adddress-box'],
                        'container-fluid')}>
                      <div className="row">
                        <div className="col-6 text-light">
                          <h6 className={styles['address-title']}>Address:</h6>
                        </div>
                        <div className="col-6 text-right">
                          <CopyText text={this.state.address}/>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-12">
                          <h6 className={classNames(styles.copy)}>
                            {this.state.address}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{
                sidebar: {
                  position: 'fixed',
                  width: '314px',
                  background: '#19191e',
                },
              }}
          >
            <button
                className={classNames(styles.toggle,
                    'toggle btn d-xl-none d-lg-block d-md-block d-sm-block d-block')}
                onClick={() => this.onSetSidebarOpen(true)}
            >
              <span className="icon-menu"/>
            </button>
          </Sidebar>
        </div>
    );
  }
}

export default SideNav;
