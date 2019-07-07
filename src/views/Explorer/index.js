import React, {Fragment, Component} from 'react';
import Menu, {Item as MenuItem} from 'rc-menu';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import Header from 'Root/shared/components/Header';
import PageTitle from 'Root/shared/components/PageTitle';
import DropDown from 'Root/shared/components/Dropdown';
import AcceptList from 'Root/shared/components/AcceptList';
import styles from './styles.less';

const Range = createSliderWithTooltip(Slider.Range);

function range(e) {
  console.log(e);
}

class Explorer extends Component {

  state = {
    horizontally: false,
    vertically: true,
    currency: 'All',
    lists: [],
  };

  componentDidMount() {
    this.setState({
      lists: [
        {
          id: '5ceb99b92e98592cd9940d53',
          address: 'TVWmQKmaJNowQewdGz16ekW2jQgXwaAfCc',
          creator: 'TAzaDwcKucTz9YJwMWotXKib4iH4RYG8PJ',
          acceptor: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
          currency: 'tron',
          predictPrice: 8000,
          predictTime: 1559212920, // based on seconds not miliseconds
          predictType: 1,
          submittedPrice: 0,
          disabled: false,
          done: false,
          betAmount: 5000 // 10 in sun
        },
        {
          id: '5ceb99b92e98592cd9940d53',
          address: 'TVWmQKmaJNowQewdGz16ekW2jQgXwaAfCc',
          creator: 'TAzaDwcKucTz9YJwMWotXKib4iH4RYG8PJ',
          acceptor: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
          currency: 'bitcoin',
          predictPrice: 6000,
          predictTime: 1559212920, // based on seconds not miliseconds
          predictType: 1,
          submittedPrice: 0,
          disabled: false,
          done: false,
          betAmount: 1000 // 10 in sun
        }
      ],
    });
  }

  showHorizontally = () => {
    this.setState({vertically: false, horizontally: true});
  };

  showVertically = () => {
    this.setState({vertically: true, horizontally: false});
  };

  handleSelect = ({key}) => {
    this.setState({
      currency: key,
    });
  };

  isEven = (index) => {
    return ((index + 1) % 2) === 0;
  };

  render() {
    let column = null;
    let rightColDiv = null;
    let leftColDiv = null;

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
          <MenuItem key="All" className={styles.menuItem}>All</MenuItem>
          <MenuItem key="Bitcoin" className={styles.menuItem}>Bitcoin</MenuItem>
          <MenuItem key="Ethereum" className={styles.menuItem}>Ethereum</MenuItem>
          <MenuItem key="Tron" className={styles.menuItem}>Tron</MenuItem>
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
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6
                                  pr-xl-1 pr-lg-1 pr-md-2 pr-sm-2 pr-2">
                    <div className="card block-padding">
                      <h6 className="block-title">
                        Currency
                      </h6>
                      <DropDown menu={menu} title={this.state.currency}/>
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
                      <h6 className="block-title">Form number</h6>
                      <div className="row">
                        <div
                            className="col-xl-8 col-lg-8 col-md-9 col-sm-9 col-9 pr-0">
                          <input className="form-control simple-form"
                                 pattern="[A-Za-z]"
                                 type="text"
                                 placeholder="Enter your form number"/>
                        </div>
                        <div className="col-3 text-right">
                          <button className="btn simple-btn">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {this.state.lists.map((list, index) => (
                      <div className={column}>
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

export default Explorer;
