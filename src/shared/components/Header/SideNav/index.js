import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Collapse} from 'reactstrap';
import Sidebar from 'react-sidebar';
import classNames from 'classnames';
import styles from './styles.less';

class SideNav extends Component {
  state = {
    sidebarOpen: false,
    pullRight: true,
    collapse: true,
    rotate: false,
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
                    <div>
                      <button
                          className={classNames(styles.close_btn, 'btn')}
                          onClick={() => this.onSetSidebarOpen(false)}
                      >
                        <span className="icon-cancel-music"/>
                      </button>
                    </div>
                    {/*<ul className="list-group border-0">*/}
                    {/*<li className="list-group-item border-0 pt-3">*/}
                    {/*<Link*/}
                    {/*to="/"*/}
                    {/*>*/}
                    {/*{'Home'}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li className={classNames(styles.toggle_list,*/}
                    {/*'list-group-item border-0 pt-3')}>*/}
                    {/*<div className="d-flex">*/}
                    {/*<div className="pr-2">*/}
                    {/*{'BlockChain'}*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<Collapse isOpen={this.state.collapse}>*/}
                    {/*<ul className="list-group border-0 pt-3">*/}
                    {/*<li className="list-group-item border-0 pt-3">*/}
                    {/*<Link*/}
                    {/*to={transactions}*/}
                    {/*>*/}
                    {/*{'Transactions'}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item border-0 pt-3">*/}
                    {/*<Link*/}
                    {/*to={blocks}*/}
                    {/*>*/}
                    {/*{'Blocks'}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item border-0 pt-3">*/}
                    {/*<Link*/}
                    {/*to={addresses}*/}
                    {/*>*/}
                    {/*{'Addresses'}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*</ul>*/}
                    {/*</Collapse>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item border-0 pt-3">*/}
                    {/*<Link*/}
                    {/*to={globalNode}*/}
                    {/*>*/}
                    {/*{'Global Nodes'}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item border-0 pt-3">*/}
                    {/*<Link*/}
                    {/*to="/"*/}
                    {/*>*/}
                    {/*{'Wallet'}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*</ul>*/}
                  </div>
              )}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              pullRight={this.state.pullRight}
              styles={{
                sidebar: {
                  position: 'fixed',
                  width: '314px',
                  backgroundImage: 'linear-gradient(335deg, #19295b, #0d163a)',
                },
              }}
          >
            <button
                className={classNames(styles.toggle,
                    'toggle btn btn-link d-xl-none d-lg-block d-md-block d-sm-block d-block')}
                onClick={() => this.onSetSidebarOpen(true)}
            >
              <img
                  src={require('../../../../assets/images/diamonds.png')}
                  alt="image"
                  height="30px"
                  width="30px"
              />
            </button>
          </Sidebar>
        </div>
    );
  }
}

export default SideNav;
