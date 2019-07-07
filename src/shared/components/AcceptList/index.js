import React, {Fragment, Component} from 'react';
import moment from 'moment';
import CopyText from 'Root/shared/components/CopyText';
import BasicModal from 'Root/shared/components/Modal';
import binanceCoin from 'Root/assets/images/binance-coin-logo.png';
import bitCoin from 'Root/assets/images/bitcoin.png';
import ethereum from 'Root/assets/images/ethereum.png';
import classNames from 'classnames';
import styles from './styles.less';

class AcceptList extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  checkImage = (currency) => {
    if (currency === 'bitcoin') {
      return bitCoin;
    }
    if (currency === 'tron') {
      return binanceCoin;
    }
    if (currency === 'ethereum') {
      return ethereum;
    }
  };

  render() {
    let newList = null;
    const trx = 1000000;
    const cryptocurrency = (
        <div className="row">
          <div className="col-4 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Cryptocurrency
              :</h6>
          </div>
          <div className="col-8 text-right">
            <img src={this.checkImage(this.props.list.currency)}
                 width="33px"
                 height="33px"
                 alt="Cryptocurrency"/>
          </div>
        </div>
    );
    const amount = (
        <div className="row">
          <div className="col-4 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Predicted
              Price :</h6>
          </div>
          <div className="col-8 text-right">
            <h6 className="info-list-text mb-0">Greater than or equal
              ${this.props.list.predictPrice}</h6>
          </div>
        </div>
    );

    const predicted = (
        <div className="row">
          <div className="col-4 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Amount of
              bet
              :</h6>
          </div>
          <div className="col-8 text-right">
            <h6 className="info-list-text mb-0">
              {this.props.list.betAmount / trx}
              <span className="info-list-text-suffix pl-1">TRX</span>
            </h6>
          </div>
        </div>
    );

    const date = (
        <div className="row">
          <div className="col-4 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Specified
              Date :</h6>
          </div>
          <div className="col-8 text-right">
            <h6 className="info-list-text mb-0">
              <span className="pr-2">{moment.unix(this.props.list.predictTime).
                  format('YYYY/MM/DD')}</span>|
              <span className="pl-2">{moment.unix(this.props.list.predictTime).
                  format('HH:mm')}</span>
            </h6>
          </div>
        </div>
    );
    if (this.props.horizontally) {
      newList = (
          <Fragment>
            {/*horizontally form*/}
            <li className="list-group-item px-0 border-bottom-less
                           py-0 d-xl-block d-lg-block d-md-none d-sm-none d-none">
              <ul className="nav nav-pills second-pill">
                <li className="nav-item half-border">
                  {cryptocurrency}
                </li>
                <li className="nav-item nav-space"/>
                <li className="nav-item half-border">
                  {amount}
                </li>
              </ul>
            </li>
            <li className="list-group-item px-0 border-bottom-less
                           py-0 d-xl-block d-lg-block d-md-none d-sm-none d-none">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  {predicted}
                </li>
                <li className="nav-item nav-space"/>
                <li className="nav-item">
                  {date}
                </li>
              </ul>
            </li>
            {/*horizontally form*/}
            {/*vertically form*/}
            <li className="list-group-item px-0
            d-xl-none d-lg-none d-md-block d-sm-block d-block">
              {cryptocurrency}
            </li>
            <li className="list-group-item px-0
            d-xl-none d-lg-none d-md-block d-sm-block d-block">
              {amount}
            </li>
            <li className="list-group-item px-0
            d-xl-none d-lg-none d-md-block d-sm-block d-block">
              {predicted}
            </li>
            <li className="list-group-item px-0
            d-xl-none d-lg-none d-md-block d-sm-block d-block">
              {date}
            </li>
            {/*vertically form*/}
          </Fragment>
      );
    }
    if (this.props.vertically) {
      newList = (
          <Fragment>
            <li className="list-group-item px-0">
              {cryptocurrency}
            </li>
            <li className="list-group-item px-0">
              {amount}
            </li>
            <li className="list-group-item px-0">
              {predicted}
            </li>
            <li className="list-group-item px-0">
              {date}
            </li>
          </Fragment>
      );
    }
    return (
        <Fragment>
          <div className="card list-padding info-list">
            <ul className="list-group list-group-flush border-0">
              <li className="list-group-item px-0">
                <div className="row">
                  <div className="col-4 p-v-center">
                    <h6 className="block-tile-lighter c-v-center mb-0">Contract
                      hash
                      :</h6>
                  </div>
                  <div className="col-8 text-right">
                          <span
                              className={classNames(styles.copy, styles.address,
                                  'pl-2')}>
                              {this.props.list.address.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.address}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'], 'pl-2')}>
                              {this.props.list.address.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.address}/>
                              </span>
                          </span>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-0">
                <div className="row">
                  <div className="col-4 p-v-center">
                    <h6 className="block-tile-lighter c-v-center mb-0">Requester
                      :</h6>
                  </div>
                  <div className="col-8 text-right">
                          <span
                              className={classNames(styles.copy, styles.address,
                                  'pl-2')}>
                              {this.props.list.creator.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.creator}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'], 'pl-2')}>
                              {this.props.list.creator.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.creator}/>
                              </span>
                          </span>
                  </div>
                </div>
              </li>
              {newList}
            </ul>
            <p className="block-complete-info">
              At the 2019/05/12|12:00 UTC if the BNB price is greater than or
              equal
              30$, the requester user is the winner and gets 500 TRX, otherwise
              the
              acceptor user in the bet gets 500 TRX and is the winner.
            </p>
            <button className={classNames(styles.btn, 'btn mt-2')}
                    onClick={this.toggle}>
              <span className="icon-checked pr-2"/>
              Accept
            </button>
          </div>
          <BasicModal modal={this.state.modal} toggle={this.toggle}/>
        </Fragment>
    );
  }
}

export default AcceptList;
