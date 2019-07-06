import React, {Component, Fragment} from 'react';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import classNames from 'classnames';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import {TimePicker} from 'antd';
import 'antd/lib/date-picker/style/css';
import Header from 'Root/shared/components/Header';
import DropDown from 'Root/shared/components/Dropdown';
import styles from './styles.less';
import {RadioGroup, Radio} from 'react-radio-group';

class CreateRequests extends Component {
  state = {
    title: 'Bitcoin',
    selectedPredictValue: 'predictGreater',
    selectedDateValue: 'custom',
    date: '',
  };
  handleSelect = ({key}) => {
    this.setState({
      title: key,
    });
  };
  handlePredictChange = (value) => {
    this.setState({selectedPredictValue: value});
  };
  handleDateChange = (value) => {
    this.setState({selectedDateValue: value});
  };
  componentDidMount() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const customDate = year + '/' + month + '/' + day;
    this.setState({date: customDate});
    // console.warn(customDate);
    // console.warn(Date.UTC(year, month, day));
  }

  render() {
    const dateFormat = 'YYYY/MM/DD';
    const format = 'HH:mm';
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
              <div
                  className="col-xl-9 col-lg-11 col-md-11 col-sm-11 col-11 body-padding">
                <h1 className="page-title">Create Request</h1>
                <div className="row">
                  <div className="col-12 mt-4">
                    <div className="card block-padding">
                      {/*dropdown*/}
                      <div className="row">
                        <div
                            className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12 pr-xl-5 pr-lg-5">
                          <h6 className="block-title">Select a currency</h6>
                          <DropDown menu={menu} title={this.state.title}/>
                        </div>
                      </div>
                      {/*predict price*/}
                      <div className="row mt-4 pt-3">
                        <div
                            className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12 pr-xl-5 pr-lg-5">
                          <h6 className="block-title">Predict price:</h6>
                          <div className="row mt-2">
                            <div
                                className="col-xl-5 col-lg-5 col-sm-5 col-md-5 col-sm-5 col-6 radio-group-section">
                              <RadioGroup
                                  name="predictPrice"
                                  selectedValue={this.state.selectedPredictValue}
                                  onChange={this.handlePredictChange}>
                                <label className="radio mt-2 pt-1">
                                  <Radio value="predictGreater"/>
                                  <span>Greater and Equal</span>
                                </label>
                                <label className="radio mt-4 pt-2">
                                  <Radio value="predictLesser"/>
                                  <span>Lesser and Equal</span>
                                </label>
                              </RadioGroup>
                            </div>
                            <div
                                className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-6">
                              <div className="row simple-input-group">
                                <div className="col-12 pl-0">
                                  <div className="input-group ">
                                    <input type="text"
                                           pattern="[0-9]*"
                                           className="form-control"
                                           disabled={this.state.selectedPredictValue ===
                                           'predictLesser'}
                                           placeholder="predict greater"/>
                                    <div className="input-group-prepend">
                                      <div className="input-group-text">$</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-2 pl-0">
                                  <div className="input-group">
                                    <input type="text"
                                           pattern="[0-9]*"
                                           className="form-control"
                                           disabled={this.state.selectedPredictValue ===
                                           'predictGreater'}
                                           placeholder="predict lesser"/>
                                    <div className="input-group-prepend">
                                      <div className="input-group-text">$</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*specified date*/}
                      <div className="row mt-4 pt-2">
                        <div
                            className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12 pr-xl-5 pr-lg-5">
                          <h6 className="block-title">Specified date (UTC)</h6>
                          <input type="text" value={this.state.date}
                                 onChange={(event) => {
                                   this.setState({date: event.target.value});
                                 }}
                                 className="form-control simple-form"/>
                        </div>
                      </div>
                      {/*Expiration date*/}
                      <div className="row mt-4 pt-2">
                        <div
                            className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12 radio-group-section">
                          <h6 className="block-title">Expiration date:</h6>
                          <RadioGroup
                              name="date"
                              selectedValue={this.state.selectedDateValue}
                              onChange={this.handleDateChange}>
                            <label className="radio mt-4">
                              <Radio value="15min"/>
                              <span>15 Min</span>
                            </label>
                            <label className="radio mt-4">
                              <Radio value="1hour"/>
                              <span>1 Hour</span>
                            </label>
                            <label className="radio mt-4">
                              <Radio value="12hour"/>
                              <span>12 Hour</span>
                            </label>
                            <label className="radio mt-4">
                              <Radio value="2month"/>
                              <span>2 Month</span>
                            </label>
                            <label className="radio mt-4">
                              <Radio value="custom"/>
                              <span>Custom date (UTC)</span>
                            </label>
                          </RadioGroup>
                        </div>
                      </div>
                      {/*custom date*/}
                      <div className={classNames(styles['date-section'],
                          'row mt-3')}>
                        <div
                            className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4">
                          <DatePicker
                              defaultValue={moment('2015/01/01', dateFormat)}
                              format={dateFormat}
                              className={styles.time}/>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                        pr-xl-5  pl-xl-0 ">
                          <TimePicker defaultValue={moment('12:08', format)}
                                      format={format}/>
                        </div>
                      </div>
                      {/*bet amount*/}
                      <div className="row mt-4 pt-2 mb-3">
                        <div className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12
                         pr-xl-5 pr-lg-5 simple-input-group">
                          <h6 className="block-title">Amount bet</h6>
                          <div className="input-group ">
                            <input type="text"
                                   pattern="[0-9]*"
                                   className="form-control"
                                   placeholder="amount"/>
                            <div className="input-group-prepend">
                              <div className="input-group-text">TRX</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className={classNames(styles.submit,
                          'btn mt-4 mb-4')}>
                        Send Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="container-fluid">*/}
          {/*<div className="row">*/}
          {/*<div className="col-12 px-0">*/}
          {/*<img src={require(*/}
          {/*'../../assets/images/design/Create Request.png')}*/}
          {/*alt="" width="100%" height="100%"/>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
        </Fragment>
    );
  }
}

export default CreateRequests;
