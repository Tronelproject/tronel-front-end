import React, {Component, Fragment} from 'react';
import Header from 'Root/shared/components/Header';
import PageTitle from 'Root/shared/components/PageTitle';
import BetList from 'Root/shared/components/BetList';
import binanceCoin from 'Root/assets/images/binance-coin-logo.png';
import bitCoin from 'Root/assets/images/bitcoin.png';
import styles from './styles.less';

class MyBets extends Component {
  state = {
    horizontally: false,
    vertically: true,
  };

  showHorizontally = () => {
    this.setState({vertically: false, horizontally: true});
  };

  showVertically = () => {
    this.setState({vertically: true, horizontally: false});
  };

  render() {
    let rightCol = null;
    let rightColDiv = null;
    let leftCol = null;
    let leftColDiv = null;

    if (this.state.horizontally) {
      rightCol = 'col-12';
      rightColDiv = '';
      leftCol = 'col-12 mt-4';
      leftColDiv = '';
    }

    if (this.state.vertically) {
      rightCol = 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-xl-auto mt-lg-auto mt-md-0 mt-sm-0 mt-0';
      rightColDiv = 'pr-xl-4 pr-lg-4';
      leftCol = 'col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-xl-auto mt-lg-auto mt-md-3 mt-sm-3 mt-3';
      leftColDiv = 'pl-xl-4 pl-lg-4';
    }
    return (
        <Fragment>
          <Header/>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div
                  className="col-xl-9 col-lg-11 col-md-11 col-sm-11 col-11 body-padding">
                <PageTitle
                    title="My Bets"
                    h={this.state.horizontally}
                    v={this.state.vertically}
                    horizontallyHandler={this.showHorizontally}
                    verticallyHandler={this.showVertically}/>
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="card block-padding">
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                          <h6 className="block-title">Form number</h6>
                          <div className="row">
                            <div
                                className="col-xl-7 col-lg-7 col-md-9 col-sm-9 col-9 pr-0">
                              <input className="form-control simple-form"
                                     pattern="[A-Za-z]"
                                     type="text"
                                     placeholder="Enter your form number"/>
                            </div>
                            <div className="col-3 text-right pl-xl-4 pl-lg-4">
                              <button className="btn simple-btn ml-xl-2 ml-lg-2">Search</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className={rightCol}>
                    <div className={rightColDiv}>
                      <BetList
                          contractHash="UjEA674fdDe714fd979de3EdF3e6hd"
                          Requester="WTEA674fdDe714fd979de3EdF6A8udk"
                          acceptor="ZDfA674fdDe714fd979de3EdF6Aj8u"
                          Cryptocurrency={binanceCoin}
                          width="33px"
                          height="33px"
                          predictedPrice="Greater than or equal $30"
                          amountOfBets="500"
                          date="2019/05/12"
                          utc="12:00 UTC"
                          type="win"
                          horizontally={this.state.horizontally}
                          vertically={this.state.vertically}
                      />
                    </div>
                  </div>
                  <div className={leftCol}>
                    <div className={leftColDiv}>
                      <BetList
                          contractHash="UjEA674fdDe714fd979de3EdF3e6hd"
                          Requester="WTEA674fdDe714fd979de3EdF6A8udk"
                          acceptor="ZDfA674fdDe714fd979de3EdF6Aj8u"
                          Cryptocurrency={bitCoin}
                          width="33px"
                          height="33px"
                          predictedPrice="Lower than or equal  6000$"
                          amountOfBets="100"
                          date="2019/06/12"
                          utc="10:00 UTC"
                          type="lose"
                          horizontally={this.state.horizontally}
                          vertically={this.state.vertically}
                      />
                    </div>
                  </div>
                </div>
                {/*<div className="row">*/}
                {/*<div className="col-12">*/}
                {/*{horizontallyPart}*/}
                {/*{verticallyPart}*/}
                {/*</div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default MyBets;
