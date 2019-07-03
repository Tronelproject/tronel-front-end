import React, {Fragment} from 'react';
import CopyText from 'Root/shared/components/CopyText';
import classNames from 'classnames';
import styles from './styles.less';

const address = 'UjEA674fdDe714fd979de3EdF3ehs8';

export const AcceptList = (props) => (
    <Fragment>
      <div className="card list-padding info-list">
        <ul className="list-group list-group-flush border-0">
          <li className="list-group-item px-0">
            <div className="row">
              <div className="col-4 p-v-center">
                <h6 className="block-tile-lighter c-v-center mb-0">Contract hash
                  :</h6>
              </div>
              <div className="col-8 text-right">
                          <span className={classNames(styles.copy, styles.address,
                                  'pl-2')}>
                              {props.contractHash.slice(0, 24)}...
                              <span className="pl-3">
                              <CopyText text={props.contractHash}/>
                              </span>
                          </span>
                          <span className={classNames(styles.copy, styles['small-address'], 'pl-2')}>
                              {props.contractHash.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={props.contractHash}/>
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
                          <span className={classNames(styles.copy, styles.address,
                              'pl-2')}>
                              {props.Requester.slice(0, 24)}...
                              <span className="pl-3">
                              <CopyText text={props.Requester}/>
                              </span>
                          </span>
                          <span className={classNames(styles.copy, styles['small-address'], 'pl-2')}>
                              {props.Requester.slice(0, 10)}...
                              <span className="pl-3">
                              <CopyText text={props.Requester}/>
                              </span>
                          </span>
              </div>
            </div>
          </li>
          <li className="list-group-item px-0">
            <div className="row">
              <div className="col-4 p-v-center">
                <h6 className="block-tile-lighter c-v-center mb-0">Cryptocurrency
                  :</h6>
              </div>
              <div className="col-8 text-right">
                <img src={props.Cryptocurrency}
                     width={props.width}
                     height={props.height}
                     alt="Cryptocurrency"/>
              </div>
            </div>
          </li>
          <li className="list-group-item px-0">
            <div className="row">
              <div className="col-4 p-v-center">
                <h6 className="block-tile-lighter c-v-center mb-0">Predicted
                  Price :</h6>
              </div>
              <div className="col-8 text-right">
                <h6 className="info-list-text mb-0">{props.predictedPrice}</h6>
              </div>
            </div>
          </li>
          <li className="list-group-item px-0">
            <div className="row">
              <div className="col-4 p-v-center">
                <h6 className="block-tile-lighter c-v-center mb-0">Amount of bet
                  :</h6>
              </div>
              <div className="col-8 text-right">
                <h6 className="info-list-text mb-0">
                  {props.amountOfBets}
                  <span className="info-list-text-suffix pl-1">TRX</span>
                </h6>
              </div>
            </div>
          </li>
          <li className="list-group-item px-0">
            <div className="row">
              <div className="col-4 p-v-center">
                <h6 className="block-tile-lighter c-v-center mb-0">Specified
                  Date :</h6>
              </div>
              <div className="col-8 text-right">
                <h6 className="info-list-text mb-0">
                  <span className="pr-2">{props.date}</span>|
                  <span className="pl-2">{props.utc}</span>
                </h6>
              </div>
            </div>
          </li>
        </ul>
        <p className="block-complete-info">
          At the 2019/05/12|12:00 UTC if the BNB price is greater than or equal
          30$, the requester user is the winner and gets 500 TRX, otherwise the
          acceptor user in the bet gets 500 TRX and is the winner.
        </p>
        <button className={classNames(styles.btn, 'btn mt-2')}>
          <span className="icon-checked pr-2"/>
          Accept
        </button>
      </div>
    </Fragment>
);

export default AcceptList;
