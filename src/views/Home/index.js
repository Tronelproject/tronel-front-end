import React, {Fragment, Component} from 'react';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import Header from 'Root/shared/components/Header';
import PageTitle from 'Root/shared/components/PageTitle';
import DropDown from 'Root/shared/components/Dropdown';
import AcceptList from 'Root/shared/components/AcceptList';
import binanceCoin from 'Root/assets/images/binance-coin-logo.png';
import bitCoin from 'Root/assets/images/bitcoin.png';
import styles from './styles.less';

const Range = createSliderWithTooltip(Slider.Range);

function range(e) {
  console.log(e);
}

class Home extends Component {

  state = {
    horizontally: false,
    vertically: true,
    title: 'Bitcoin',
  };

  showHorizontally = () => {
    this.setState({vertically: false, horizontally: true});
    return this.state.horizontally;
  };

  showVertically = () => {
    this.setState({vertically: true, horizontally: false});
    return this.state.vertically;
  };

  handleSelect = ({key}) => {
    this.setState({
      title: key,
    });
  };

  render() {
    let horizontallyPart = null;
    let verticallyPart = null;

    if (this.state.horizontally) {
      horizontallyPart = (<h1>horizontallyPart</h1>);
    }

    if (this.state.vertically) {
      verticallyPart = (<h1>verticallyPartPart</h1>);
    }

    const menu = (
        <Menu onSelect={this.handleSelect} className={styles.menu}>
          <MenuItem key="Bitcoin" className={styles.menuItem}>
            Bitcoin
          </MenuItem>
          <Divider/>
          <MenuItem key="Ethereum" className={styles.menuItem}>
            Ethereum
          </MenuItem>
        </Menu>
    );
    return (
        <Fragment>
          <Header/>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-11 col-md-11 col-sm-11 col-11 body-padding">
                <PageTitle
                    title="Explorer"
                    h={this.state.horizontally}
                    v={this.state.vertically}
                    horizontallyHandler={this.showHorizontally}
                    verticallyHandler={this.showVertically}/>
                <div className="row mt-3">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6
                                  pr-xl-1 pr-lg-1 pr-md-2 pr-sm-2 pr-2">
                    <div className="card block-padding">
                      <h6 className="block-title">
                        Currency
                      </h6>
                      <DropDown menu={menu} title={this.state.title}/>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6
                                  px-xl-1 px-lg-1 pl-md-2 pl-sm-2 pl-2">
                    <div className="card block-padding">
                      <h6 className="block-title pb-2">
                        Amount of bet
                      </h6>
                      <Range onChange={range}
                             min={0}
                             max={1000}
                             defaultValue={[200, 500]}
                             railStyle={{background: '#b2b4b7'}}
                             className={styles.range}
                             tipFormatter={value => `${value} TRX`}
                             tipProps={{
                               overlayClassName: styles.tooltip,
                               placement: 'bottom',
                             }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12
                                  pl-xl-1 pl-lg-1
                                  mt-xl-auto mt-lg-auto mt-md-3 mt-sm-3 mt-3">
                    <div className="card block-padding">
                      <h6 className="block-title">Form number</h6>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-9 col-sm-9 col-9 pr-0">
                          <input className="form-control simple-form" pattern="[A-Za-z]"
                                 type="text" placeholder="Enter your form number"/>
                        </div>
                        <div className="col-3 text-right">
                          <button className="btn simple-btn">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12
                                   mt-xl-auto mt-lg-auto mt-md-3 mt-sm-3 mt-3">
                    <div className="pr-xl-4 pr-lg-4">
                      <AcceptList
                          contractHash="UjEA674fdDe714fd979de3EdF3e6hd"
                          Requester="WTEA674fdDe714fd979de3EdF6A8udk"
                          Cryptocurrency={binanceCoin}
                          width="33px"
                          height="33px"
                          predictedPrice="Greater than or equal $30"
                          amountOfBets="500"
                          date="2019/05/12"
                          utc="12:00 UTC"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12
                                  mt-xl-auto mt-lg-auto mt-md-3 mt-sm-3 mt-3">
                    <div className="pl-xl-4 pl-lg-4">
                    <AcceptList
                        contractHash="UjEA674fdDe714fd979de3EdF3e6hd"
                        Requester="WTEA674fdDe714fd979de3EdF6A8udk"
                        Cryptocurrency={bitCoin}
                        width="33px"
                        height="33px"
                        predictedPrice="Lower than or equal  6000$"
                        amountOfBets="100"
                        date="2019/06/12"
                        utc="10:00 UTC"
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
          {/*<div className="container-fluid">*/}
            {/*<div className="row">*/}
              {/*<div className="col-12 px-0">*/}
                {/*<img src={require('../../assets/images/design/Explorer.png')}*/}
                     {/*alt="" width="100%" height="100%"/>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        </Fragment>
    );
  }
}

export default Home;
