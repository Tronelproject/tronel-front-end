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
    currency: 'Bitcoin',
    currencyKey: 'bitcoin',
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
    // console.warn(moment().format('YYYY/MM/DD'));
    // console.warn(moment().endOf('day'));
  }

  handleSelect = ({key}) => {
    this.setState({
      currency: key.charAt(0).toUpperCase() + key.slice(1),
      currencyKey: key,
    });
    // console.warn(key);
  };
  handlePredictChange = (value) => {
    this.setState({selectedPredictValue: value});
  };
  handleDateChange = (value) => {
    this.setState({selectedDateValue: value});
  };

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  disabledHours = () => {
    const hours = this.range(0, 60);
    const currentHour = moment.utc().format('HH');
    hours.splice(currentHour, 24 - currentHour);
    return hours;
  };

  disabledMinutes = () => {
    const currentMinutes = moment.utc().format('mm');
    return this.range(0, currentMinutes);
  };

  disabledExpirationHours = () => {
    const hours = this.range(0, 60);
    const currentHour = moment.utc().format('HH');
    hours.splice(0, currentHour);
    return hours;
  };

  disabledExpirationMinutes = () => {
    const currentMinutes = moment.utc().format('mm');
    return this.range((currentMinutes) - 1, 59);
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
    // console.warn(moment.utc().format('HH:mm:ss'));
    return current && current < moment().endOf('day').subtract(1, 'd');
  };

  disabledExpirationDate = (current) => {
    if (this.state.specifiedDate) {
      return current < moment().endOf('day').subtract(1, 'd') ||
          current > this.state.specifiedDate;
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
      currency: this.state.currencyKey,
      predictPrice: this.state.predictPrice,
      predictType: predictType,
      specifiedDate: this.state.specifiedDate,
      specifiedTime: this.state.specifiedTime,
      expirationDate: this.state.expirationDate,
      expirationTime: this.state.expirationTime,
      betAmount: this.state.betAmount,
    };

    const msd = this.state.specifiedDate.clone();
    msd.set({
      hour: this.state.specifiedTime.hour(),
      minute: this.state.specifiedTime.minute(),
    });

    const med = this.state.expirationDate.clone();
    med.set({
      hour: this.state.expirationTime.hour(),
      minute: this.state.expirationTime.minute(),
    });

    addBet({
      currency: this.state.currencyKey,
      predictionPrice: this.state.predictPrice,
      predictionType: predictType,
      specifiedDate: msd.toDate().getTime(),
      lockTime: med.toDate().getTime(),
      betAmount: this.state.betAmount,
    });
  };

  render() {
    const dateFormat = 'YYYY/MM/DD';
    const format = 'HH:mm';
    const menu = (
        <Menu onSelect={this.handleSelect} className={styles.menu}>
          <MenuItem key="bitcoin" className={styles.menuItem}>Bitcoin</MenuItem>
          <MenuItem key="ethereum"
                    className={styles.menuItem}>Ethereum</MenuItem>
          <MenuItem key="tron" className={styles.menuItem}>Tron</MenuItem>
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
                          <h6 className="block-title">Select a
                            cryptocurrency</h6>
                          <DropDown menu={menu} title={this.state.currency}/>
                        </div>
                      </div>
                      {/*predict price*/}
                      <div className="row mt-4 pt-3">
                        <div
                            className="col-xl-6 col-lg-9 col-md-10 col-sm-12 col-12 pr-xl-5 pr-lg-5">
                          <h6 className="block-title">Prediction price:</h6>
                          <div className="row mt-2">
                            <div className="radio-group-section
                                 w-100 px-3">
                              <RadioGroup
                                  name="predictPrice"
                                  selectedValue={this.state.selectedPredictValue}
                                  onChange={this.handlePredictChange}>
                                <div className="row">
                                  <div
                                      className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12">
                                    <label className="radio mt-2 pt-1">
                                      <Radio value="predictGreater"/>
                                      <span>Greater and Equal</span>
                                    </label>
                                  </div>
                                  <div
                                      className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 simple-input-group">
                                    <div className="input-group ">
                                      <input type="number"
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
                                        <div className="input-group-text">$
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div
                                      className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12">
                                    <label className="radio mt-2 pt-1">
                                      <Radio value="predictLesser"/>
                                      <span>Lesser and Equal</span>
                                    </label>
                                  </div>
                                  <div
                                      className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 simple-input-group">
                                    <div className="input-group">
                                      <input type="number"
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
                                        <div className='input-group-text'>$
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                            {/*<div*/}
                            {/*className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12">*/}
                            {/*<div className="row simple-input-group">*/}
                            {/*<div className="col-12 pl-0">*/}
                            {/**/}
                            {/*</div>*/}
                            {/*<div className="col-12 mt-2 pl-0">*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                          </div>
                        </div>
                      </div>
                      {/*specified date*/}
                      <div className="row mt-4 pt-2">
                        <div className="col-12">
                          <h6 className="block-title">Specified date</h6>
                        </div>
                      </div>
                      <div
                          className={classNames(styles['date-section'], 'row')}>
                        <div
                            className='col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4'>
                          <DatePicker
                              onChange={this.onChangeSpecifiedDate}
                              disabledDate={this.disabledSpecifiedDate}
                              format={dateFormat}
                              className={styles.time}/>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                                             pr-xl-5  pl-xl-0 ">
                          <TimePicker
                              format={format}
                              disabledHours={this.disabledHours}
                              disabledMinutes={this.disabledMinutes}
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
                        </div>
                      </div>
                      {/*custom date*/}
                      <div
                          className={classNames(styles['date-section'], 'row')}>
                        <div
                            className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4">
                          <DatePicker
                              onChange={this.onChangeExpirationDate}
                              disabled={this.state.selectedDateValue !==
                              'custom'}
                              format={dateFormat}
                              disabledDate={this.disabledExpirationDate}
                              className={styles.time}/>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                        pr-xl-5  pl-xl-0 ">
                          <TimePicker
                              format={format}
                              disabled={this.state.selectedDateValue !==
                              'custom'}
                              disabledHours={this.disabledExpirationHours}
                              disabledMinutes={this.disabledExpirationMinutes}
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
                            <input type="number"
                                   onChange={(event) => {
                                     this.setState({
                                       betAmount: parseInt(event.target.value),
                                     });
                                   }}
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
