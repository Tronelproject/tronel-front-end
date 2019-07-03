import React, {Fragment, Component} from 'react';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import Header from 'Root/shared/components/Header';
import PageTitle from 'Root/shared/components/PageTitle';
import DropDown from 'Root/shared/components/Dropdown';
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

  handleSelect = ({ key }) => {
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
              <div className="col-9 body-padding">
                <PageTitle
                    title="Explorer"
                    h={this.state.horizontally}
                    v={this.state.vertically}
                    horizontallyHandler={this.showHorizontally}
                    verticallyHandler={this.showVertically}/>
                <div className="row mt-3">
                  <div className="col-3">
                    <div className="card block-padding">
                      <h6 className="block-title">
                        Currency
                      </h6>
                      <DropDown menu={menu} title={this.state.title}
                                width="152"/>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card block-padding">
                      <h6 className="block-title">
                        Amount of bet
                      </h6>
                      <Range onChange={range}
                             min= {0}
                             max= {1000}
                             defaultValue={[200,500]}
                             railStyle={{ background:'#b2b4b7'}}
                             className={styles.range}
                             tipFormatter={value => `${value} TRX`}
                             tipProps={{
                               overlayClassName: styles.tooltip,
                               placement: 'bottom',
                             }}
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
