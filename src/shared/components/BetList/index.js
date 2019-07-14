import React, {Component, Fragment} from 'react';
import moment from 'moment';
import CopyText from 'Root/shared/components/CopyText';
import bitCoin from 'Root/assets/images/bitcoin.png';
import ethereum from 'Root/assets/images/ethereum.png';
import tron from 'Root/assets/images/tron.png';
import classNames from 'classnames';
import styles from './styles.less';

let state = null;

class BetList extends Component {
  state = {};

  checkImage = (currency) => {
    if (currency === 'bitcoin') {
      return bitCoin;
    }
    if (currency === 'tron') {
      return tron;
    }
    if (currency === 'ethereum') {
      return ethereum;
    }
  };

  checkState(won, lost, pending) {
    if (this.props.list.done) {
      if (this.props.list.creator === global.tronWeb.defaultAddress.base58) {
        if (this.props.list.predictionType === 1) {
          if (this.props.list.submittedPrice >=
              this.props.list.predictionPrice) {
            state = won;
          } else {
            state = lost;
          }
        } else {
          if (this.props.list.submittedPrice <
              this.props.list.predictionPrice) {
            state = won;
          } else {
            state = lost;
          }
        }
      } else {
        if (this.props.list.predictionType === 1) {
          if (this.props.list.submittedPrice >=
              this.props.list.predictionPrice) {
            state = lost;
          } else {
            state = won;
          }
        } else {
          if (this.props.list.submittedPrice <
              this.props.list.predictionPrice) {
            state = won;
          } else {
            state = won;
          }
        }
      }
    } else {
      state = pending;
    }
  }

  render() {
    const won = (
        <p className="block-type block-type-win text-center mb-4">You Won</p>
    );

    const lost = (
        <p className="block-type block-type-lose text-center mb-4">You Lost</p>
    );

    const pending = (
        <p className="block-type block-type-pending text-center mb-4">Pending</p>
    );

    this.checkState(won, lost, pending);

    let newList = null;
    const trx = 1000000;
    const priceAmount = 10000;
    let predictText = (<span>Greater than or equal</span>);
    if (this.props.list.predictionType === 0) {
      predictText = (<span>Lesser than or equal</span>);
    }
    const cryptocurrency = (
        <div className="row">
          <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Cryptocurrency
              :</h6>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12
               mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3
              text-xl-right text-lg-right text-md-right text-sm-right text-left">
            <img src={this.checkImage(this.props.list.currency)}
                 width="33px"
                 height="33px"
                 alt="Cryptocurrency"/>
          </div>
        </div>
    );
    const amount = (
        <div className="row">
          <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Predicted
              Price :</h6>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12
               mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
            <h6 className="info-list-text mb-0
            text-xl-right text-lg-right text-md-right text-sm-right text-left">
              {predictText}{' '}
              ${this.props.list.predictionPrice / priceAmount}</h6>
          </div>
        </div>
    );

    const predicted = (
        <div className="row">
          <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Amount of
              bet
              :</h6>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12
               mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
            <h6 className="info-list-text mb-0
            text-xl-right text-lg-right text-md-right text-sm-right text-left">
              {this.props.list.betAmount / trx}
              <span className="info-list-text-suffix pl-1">TRX</span>
            </h6>
          </div>
        </div>
    );

    const date = (
        <div className="row">
          <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">Specified
              Date :</h6>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12
               mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
            <h6 className="info-list-text mb-0
            text-xl-right text-lg-right text-md-right text-sm-right text-left">
               <span className="pr-2">{moment.unix(
                   this.props.list.specifiedDate).
                   format('YYYY/MM/DD')}</span>|
              <span className="pl-2">{moment.unix(
                  this.props.list.specifiedDate).
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
                  <div
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
                    <h6 className="block-tile-lighter c-v-center mb-0">Bet
                      ID :</h6>
                  </div>
                  <div
                      className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
                          <span
                              className={classNames(styles.copy, styles.address,
                                  'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0' +
                                  'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list._id.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list._id}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'],
                        'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0' +
                        'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                                    {this.props.list._id.slice(0, 10)}...
                                    <span className="pl-3">
                                    <CopyText text={this.props.list._id}/>
                                    </span>
                                </span>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-0">
                <div className="row">
                  <div
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
                    <h6 className="block-tile-lighter c-v-center mb-0">Requester
                      :</h6>
                  </div>
                  <div
                      className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
                          <span
                              className={classNames(styles.copy, styles.address,
                                  'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0' +
                                  'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list.creator.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.creator}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'],
                        'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0' +
                        'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list.creator.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.creator}/>
                              </span>
                          </span>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-0">
                <div className="row">
                  <div
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
                    <h6 className="block-tile-lighter c-v-center mb-0">Acceptor
                      :</h6>
                  </div>
                  <div
                      className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
                          <span
                              className={classNames(styles.copy, styles.address,
                                  'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0' +
                                  'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list.acceptor.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.acceptor}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'],
                        'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0' +
                        'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list.acceptor.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.acceptor}/>
                              </span>
                          </span>
                  </div>
                </div>
              </li>
              {newList}
            </ul>
            <p className="block-complete-info mb-4">
              At the {moment.unix(this.props.list.specifiedDate).
                format('YYYY/MM/DD')} |
              {' '}{moment.unix(this.props.list.specifiedDate).format('HH:mm')}
              {' '}if the {this.props.list.currency} price is
              {' '}{predictText}{' '}
              ${this.props.list.predictionPrice / priceAmount},
              the requester user is the winner and
              gets {(this.props.list.betAmount / trx) * 2} TRX, otherwise the
              acceptor user in the bet gets{' '}
              {(this.props.list.betAmount / trx) * 2}{' '}
              TRX and is the winner.
            </p>
            {state}
          </div>
        </Fragment>
    );
  }
}

export default BetList;
