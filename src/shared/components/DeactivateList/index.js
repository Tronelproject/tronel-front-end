import React, {Component, Fragment} from 'react';
import store from 'Root/store';
import moment from 'moment';
import classNames from 'classnames';
import CopyText from 'Root/shared/components/CopyText';
import AlertModal from 'Root/shared/components/AlertModal';
import BasicModal from 'Root/shared/components/Modal';
import bitCoin from 'Root/assets/images/bitcoin.png';
import ethereum from 'Root/assets/images/ethereum.png';
import tron from 'Root/assets/images/tron.png';
import styles from './styles.less';

class DeactivateList extends Component {
  state = {
    modal: false,
    warning: false,
  };

  toggle = () => {
    if ((store.getState().user.balance / 1000000) < 2) {
      this.setState({warning: true});
    } else {
      this.setState({
        modal: !this.state.modal,
        warning: false,
      });
    }
  };

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

  convertDate = (time) => {
    return moment.utc(moment.unix(time)).format('YYYY/MM/DD');
  };

  convertTime = (time) => {
    return moment.utc(moment.unix(time)).format('HH:mm');
  };

  render() {
    // console.warn();
    let newList = null;
    const trx = 1000000;
    const priceAmount = 10000;
    let predictText = (<span>Greater than or equal</span>);
    if (this.props.list.predictionType === 0) {
      predictText = (<span>Lesser than or equal</span>);
    }
    let listButton = (
        <button className={classNames(styles.btn, 'btn mt-2')}
                onClick={this.toggle}>
          <span className="icon-power pr-2"/>
          Deactive this bet
        </button>
    );
    if (this.props.list.disabled) {
      listButton = (
          <button
              className={classNames(styles['btn-deactivate'], 'btn mt-2')}>
            This bet has been deactived
          </button>
      );
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
              <span className="pr-2">{this.convertDate(
                  this.props.list.specifiedDate)}</span>|
              <span className="pl-2">{this.convertTime(
                  this.props.list.specifiedDate)}{' '}(UTC)</span>
            </h6>
          </div>
        </div>
    );
    const expirationDate = (
        <div className="row">
          <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 p-v-center">
            <h6 className="block-tile-lighter c-v-center mb-0">
              Expiration date :</h6>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12
               mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-3">
            <h6 className="info-list-text mb-0
            text-xl-right text-lg-right text-md-right text-sm-right text-left">
              <span className="pr-2">{this.convertDate(
                  this.props.list.lockTime)}</span>|
              <span className="pl-2">{this.convertTime(
                  this.props.list.lockTime)}{' '}(UTC)</span>
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
                                  'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0 ' +
                                  'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list._id.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list._id}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'],
                        'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0 ' +
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
                                  'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0 ' +
                                  'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list.creator.slice(0, 21)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.creator}/>
                              </span>
                          </span>
                    <span className={classNames(styles.copy,
                        styles['small-address'],
                        'pl-xl-2 pl-lg-2 pl-md-2 pl-sm-2 pl-0 ' +
                        'text-xl-right text-lg-right text-md-right text-sm-right text-left')}>
                              {this.props.list.creator.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={this.props.list.creator}/>
                              </span>
                          </span>
                  </div>
                </div>
              </li>
              {newList}
              <li className="list-group-item px-0">
                {expirationDate}
              </li>
            </ul>
            <p className="block-complete-info">
              At the {this.convertDate(this.props.list.specifiedDate)} |
              {' '}{this.convertTime(this.props.list.specifiedDate)}{' '}(UTC)
              {' '}if the {this.props.list.currency} price is
              {' '}{predictText}{' '}
              ${this.props.list.predictionPrice / priceAmount},
              the requester user is the winner and
              gets {(this.props.list.betAmount / trx) * 2} TRX, otherwise the
              acceptor user in the bet gets{' '}
              {(this.props.list.betAmount / trx) * 2}{' '}
              TRX and is the winner.
            </p>
            {listButton}
          </div>
          <AlertModal modal={this.state.modal}
                      toggle={this.toggle}
                      bet={this.props.list}/>
          <BasicModal
              warningStatus={this.state.warning}
              type={'deactivateWarning'}
              title={'For this action you need minimum 2 TRX'}
              text={'It will spend for a fee on the send data to the smart contract'}
          />
        </Fragment>
    );
  }
}

export default DeactivateList;
