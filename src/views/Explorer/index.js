import React, {Fragment, Component} from 'react';
import Menu, {Item as MenuItem} from 'rc-menu';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import {connect} from 'react-redux';
import Header from 'Root/shared/components/Header';
import PageTitle from 'Root/shared/components/PageTitle';
import DropDown from 'Root/shared/components/Dropdown';
import AcceptList from 'Root/shared/components/AcceptList';
import styles from './styles.less';

const Range = createSliderWithTooltip(Slider.Range);

class Explorer extends Component {

  state = {
    horizontally: false,
    vertically: true,
    currency: 'All',
    currencyKey: 'all',
    betID: '',
    bets: [],
  };

  componentDidMount() {
    this.setState({bets: [...this.props.bets]});
    if (localStorage.getItem('explorerLayout')) {
      if (localStorage.getItem('explorerLayout') === 'horizontally') {
        this.showHorizontally();
      } else {
        this.showVertically();
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({bets: [...nextProps.bets]});
  }

  showHorizontally = () => {
    this.setState({vertically: false, horizontally: true});
    localStorage.setItem('explorerLayout', 'horizontally');
  };

  showVertically = () => {
    this.setState({vertically: true, horizontally: false});
    localStorage.setItem('explorerLayout', 'vertically');
  };

  handleSelect = ({key}) => {
    this.setState({
      currency: key.charAt(0).toUpperCase() + key.slice(1),
      currencyKey: key,
    });
    if (key === 'all') {
      this.setState(
          {bets: [...this.props.bets]},
      );
    } else {
      this.setState(
          {
            bets: this.props.bets.filter(
                bet => bet.currency === key),
          },
      );
    }
  };

  range = (e) => {
    const trx = 1000000;
    this.setState(
        {
          bets: this.props.bets.filter(
              bet => ((bet.betAmount / trx) >= e[0])
                  && ((bet.betAmount / trx) <= e[1])),
        },
    );
  };

  onFindByBetId = () => {
    if (this.state.betID.length > 0) {
      this.setState(
          {bets: this.props.bets.filter(bet => bet._id === this.state.betID)},
      );
    } else {
      this.setState(
          {bets: [...this.props.bets]},
      );
    }
  };

  isEven = (index) => {
    return ((index + 1) % 2) === 0;
  };

  render() {
    let column = null;
    let rightColDiv = null;
    let leftColDiv = null;
    console.warn(this.state.bets);

    if (this.state.horizontally) {
      column = 'col-12 mt-4';
      rightColDiv = '';
      leftColDiv = '';
    }

    if (this.state.vertically) {
      column = 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4';
      rightColDiv = 'pr-xl-4 pr-lg-4';
      leftColDiv = 'pl-xl-4 pl-lg-4';
    }

    const menu = (
        <Menu onSelect={this.handleSelect} className={styles.menu}>
          <MenuItem key="all" className={styles.menuItem}>All</MenuItem>
          <MenuItem key="bitcoin" className={styles.menuItem}>Bitcoin</MenuItem>
          <MenuItem key="ethereum"
                    className={styles.menuItem}>Ethereum</MenuItem>
          <MenuItem key="tron" className={styles.menuItem}>Tron</MenuItem>
        </Menu>
    );
    return (
        <Fragment>
          <Header/>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div
                  className="col-xl-9 col-lg-11 col-md-11 col-sm-11 col-11 body-padding">
                <PageTitle
                    title="Explorer"
                    h={this.state.horizontally}
                    v={this.state.vertically}
                    horizontallyHandler={this.showHorizontally}
                    verticallyHandler={this.showVertically}/>
                <div className="row mt-4">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12
                                  pr-xl-1 pr-lg-1 pr-md-2">
                    <div className="card block-padding">
                      <h6 className="block-title">
                        Cryptocurrency
                      </h6>
                      <DropDown menu={menu} title={this.state.currency}/>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12
                                  px-xl-1 px-lg-1 pl-md-2 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-3 mt-3">
                    <div className="card block-padding">
                      <h6 className="block-title pb-2">
                        Amount of bet
                      </h6>
                      <Range onChange={(event) => {
                        this.range(event);
                      }}
                             min={0}
                             max={1000}
                             defaultValue={[200, 500]}
                             railStyle={{background: '#b2b4b7'}}
                             className={styles.range}
                             tipFormatter={value => `${value} TRX`}
                             tipProps={{
                               overlayClassName: styles.tooltip,
                               placement: 'bottom',
                               visible: true,
                             }}
                      />
                      <span className="d-flex">
                        <span
                            className="w-50 text-left rc-slider-min-max">0</span>
                        <span className="w-50 text-right rc-slider-min-max"
                              style={{float: 'right'}}>1000</span>
                     </span>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12
                                  pl-xl-1 pl-lg-1
                                  mt-xl-0 mt-lg-0 mt-md-3 mt-sm-3 mt-3">
                    <div className="card block-padding">
                      <h6 className="block-title">Bet ID</h6>
                      <div className="row">
                        <div
                            className="col-xl-8 col-lg-8 col-md-9 col-sm-12 col-12
                            pr-xl-0 pr-lg-0 pr-md-0">
                          <input className="form-control simple-form"
                                 pattern="[A-Za-z]"
                                 type="text"
                                 onChange={(event) => {
                                   this.setState({betID: event.target.value});
                                 }}
                                 placeholder="Enter your bet id"/>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12
                             text-xl-right text-lg-right text-md-right text-sm-left
                             text-left mt-xl-0 mt-lg-0 mt-md-0 mt-sm-2 mt-2">
                          <button className="btn simple-btn"
                                  onClick={this.onFindByBetId}>Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {this.state.bets.map((list, index) => (
                      <div className={column} key={index}>
                        <div className={this.isEven(index) ?
                            leftColDiv :
                            rightColDiv}>
                          <AcceptList
                              list={list}
                              horizontally={this.state.horizontally}
                              vertically={this.state.vertically}
                          />
                        </div>
                      </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
          {/*<div className="container-fluid">*/}
          {/*<div className="row">*/}
          {/*<div className="col-12 px-0">*/}
          {/*<img src={require(*/}
          {/*'../../assets/images/design/Explorer(Horizontal).png')}*/}
          {/*alt="" width="100%" height="100%"/>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
        </Fragment>
    );
  }
}

export default connect(state => ({
  bets: state.bets,
}))(Explorer);
