import React, {Component, Fragment} from 'react';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import classNames from 'classnames';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import {TimePicker} from 'antd';
import 'antd/lib/date-picker/style/css';
import Header from 'Root/shared/components/Header';
import DropDown from 'Root/shared/components/Dropdown';
import addBet from 'Root/actions/myrequests/add';
import styles from './styles.less';
import {RadioGroup, Radio} from 'react-radio-group';

class CreateRequests extends Component {
  state = {
    currency: 'All',
    selectedPredictValue: 'predictGreater',
    selectedDateValue: 'custom',
    date: '',
    predictPrice: '',
    specifiedDate: '',
    specifiedTime: '',
    expirationDate: '',
    expirationTime: '',
    betAmount: '',
  };

  componentDidMount() {
    this.setState({date: moment().format('YYYY/MM/DD')});
    console.warn(moment().format('YYYY/MM/DD'));
    console.warn(moment().endOf('day'));
  }

  handleSelect = ({key}) => {
    this.setState({
      currency: key,
    });
  };
  handlePredictChange = (value) => {
    this.setState({selectedPredictValue: value});
  };
  handleDateChange = (value) => {
    this.setState({selectedDateValue: value});
  };

  onChangeSpecifiedDate = (date, dateString) => {
    // console.log(date, dateString);
    this.setState({specifiedDate: date});
    this.disabledExpirationDate(this.state.specifiedDate);
  };

  onChangeExpirationDate = (date, dateString) => {
    // console.log(date, dateString);
    this.setState({expirationDate: date});
  };

  disabledSpecifiedDate = (current) => {
    return current && current < moment().endOf('day');
  };

  disabledExpirationDate = (current) => {
    if (this.state.specifiedDate) {
      return current > this.state.specifiedDate;
    } else {
      return current && current > moment().endOf('day');
    }
  };

  onSubmit = () => {
    let predictType = 1;
    if (this.state.selectedPredictValue === 'predictLesser') {
      predictType = 0;
    }
    const data = {
      currency: this.state.currency,
      predictPrice: this.state.predictPrice,
      predictType: predictType,
      specifiedDate: this.state.specifiedDate,
      specifiedTime: this.state.specifiedTime,
      expirationType: this.state.selectedDateValue,
      expirationDate: this.state.expirationDate,
      expirationTime: this.state.expirationTime,
      betAmount: this.state.betAmount
    };

    addBet({
      currency: this.state.currency,
      predictionPrice: this.state.predictPrice,
      predictionType: predictType,
      specifiedDate: this.state.specifiedDate.toDate().getTime(),
      lockTime: this.state.expirationDate.toDate().getTime(),
      betAmount: this.state.betAmount,
    });
  };

  render() {
    const dateFormat = 'YYYY/MM/DD';
    const format = 'HH:mm';
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
                <h1 className="page-title">Create Request</h1>
                <div className="row">
                  <div className="col-12 mt-4">
                    <div className="card block-padding">
                      {/*dropdown*/}
                      <div className="row">
                        <div
                            className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12 pr-xl-5 pr-lg-5">
                          <h6 className="block-title">Select a currency</h6>
                          <DropDown menu={menu} title={this.state.currency}/>
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
                                           onChange={(event) => {
                                             this.setState(
                                                 {predictPrice: event.target.value});
                                           }}
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
                                           onChange={(event) => {
                                             this.setState(
                                                 {predictPrice: event.target.value});
                                           }}
                                           pattern='[0-9]*'
                                           className='form-control'
                                           disabled={this.state.selectedPredictValue ===
                                           'predictGreater'}
                                           placeholder='predict lesser'/>
                                    <div className='input-group-prepend'>
                                      <div className='input-group-text'>$</div>
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
                        <div className="col-12">
                          <h6 className="block-title">Specified date (UTC)</h6>
                        </div>
                      </div>
                      <div
                          className={classNames(styles['date-section'], 'row')}>
                        <div
                            className='col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4'>
                          <DatePicker
                              disabledDate={this.disabledSpecifiedDate}
                              onChange={this.onChangeSpecifiedDate}
                              format='YYYY-MM-DD'
                              className={styles.time}/>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                                             pr-xl-5  pl-xl-0 ">
                          <TimePicker
                              format={format}
                              onChange={(time) => {
                                this.setState({specifiedTime: time});
                              }}
                          />
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
                      <div className={classNames(
                          styles['date-section'],
                          'row mt-3')}>
                        <div
                            className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4">
                          <DatePicker
                              onChange={this.onChangeExpirationDate}
                              disabledDate={this.disabledExpirationDate}
                              disabled={this.state.selectedDateValue !== 'custom'}
                              format={dateFormat}
                              className={styles.time}/>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                        pr-xl-5  pl-xl-0 ">
                          <TimePicker
                              format={format}
                              disabled={this.state.selectedDateValue !== 'custom'}
                              onChange={(time) => {
                                this.setState({expirationTime: time});
                              }}
                          />
                        </div>
                      </div>
                      {/*bet amount*/}
                      <div className="row mt-4 pt-2 mb-3">
                        <div className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12
                         pr-xl-5 pr-lg-5 simple-input-group">
                          <h6 className="block-title">Amount bet</h6>
                          <div className="input-group ">
                            <input type="text"
                                   onChange={(event) => {this.setState({betAmount: parseInt(event.target.value)})}}
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
                          'btn mt-4 mb-4')} onClick={this.onSubmit}>
                        Send Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default CreateRequests;
