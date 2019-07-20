import React, {Component, Fragment} from 'react';
import BasicModal from 'Root/shared/components/Modal';
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
import history from 'Root/history';

let validate = false;

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
    errors: {
      predictPrice: '',
      specified: '',
      expiration: '',
      betAmount: '',
    },
    warning: false,
  };

  handleSelect = ({key}) => {
    this.setState({
      currency: key.charAt(0).toUpperCase() + key.slice(1),
      currencyKey: key,
    });
  };

  handleErrors = (msd, med) => {
    if (this.state.predictPrice.length >= 0) {
      this.checkError(
        !parseFloat(this.state.predictPrice),
          'predictPrice',
          'Please enter number');
    }
    if (this.state.betAmount.length >= 0) {
      this.checkError(
        !parseFloat(this.state.betAmount) || parseFloat(this.state.betAmount) < 10,
          'betAmount',
          'Please enter number and greater than 10 TRX',
      );
    }
    this.checkError(
        msd === null,
        'specified',
        'Please select specified data and time',
    );
    this.checkError(
        med === null,
        'expiration',
        'Please select expiration data and time',
    );
    if (this.state.specifiedDate && this.state.specifiedTime) {
      this.checkError(
          msd < moment() + 10 * 60 * 1000,
          'specified',
          'Specified date must be greater than now + 10 minutes',
      );
    }
    if (this.state.expirationDate && this.state.expirationTime) {
      this.checkError(
          (med < moment() + 10 * 60 * 1000) || (med > msd),
          'expiration',
          'Expiration date must be greater than now + 10 minutes and lesser than specified date',
      );
    }
  };

  checkError = (condition, name, errorText) => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: condition ? errorText : '',
      },
    }), () => {
      validate = this.validateForm(this.state.errors);
    });
  };

  onChangeSpecifiedDate = (date, dateString) => {
    this.setState({specifiedDate: date});
    // this.disabledExpirationDate(this.state.specifiedDate);
  };

  onChangeExpirationDate = (date, dateString) => {
    this.setState({expirationDate: date});
  };

  validateForm = (errors) => {
    let valid = true;
    Object.keys(errors).forEach(
        (val) => {
          errors[val].length > 0 && (valid = false);
        },
    );
    return valid;
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

    let msd = null;
    if (this.state.specifiedDate && this.state.specifiedTime) {
      msd = this.state.specifiedDate.clone();
      msd.set({
        hour: this.state.specifiedTime.hour(),
        minute: this.state.specifiedTime.minute(),
      });
    }

    let med = null;
    if (this.state.expirationDate && this.state.expirationTime) {
      med = this.state.expirationDate.clone();
      med.set({
        hour: this.state.expirationTime.hour(),
        minute: this.state.expirationTime.minute(),
      });
    }

    this.handleErrors(msd, med);
    this.setState({}, async () => {
      // console.warn(validate);
      if (validate) {
        this.setState({warning: true});
        await addBet({
          currency: this.state.currencyKey,
          predictionPrice: this.state.predictPrice,
          predictionType: predictType,
          specifiedDate: msd.toDate().getTime(),
          lockTime: med.toDate().getTime(),
          betAmount: this.state.betAmount,
        });
        history.push('/my-requests');
      }
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
                                  onChange={(event) => {
                                    this.setState(
                                        {selectedPredictValue: event});
                                  }}>
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
                                    <div className={'input-group ' +
                                    ((this.state.errors.predictPrice.length >
                                        0 &&
                                        this.state.selectedPredictValue ===
                                        'predictGreater'
                                    ) ? 'input-error' : '')}>
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
                                    {this.state.errors.predictPrice.length >
                                    0 &&
                                    (this.state.selectedPredictValue ===
                                        'predictGreater') &&
                                    <small
                                        className="form-text error-text">
                                      {this.state.errors.predictPrice}
                                    </small>
                                    }
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
                                    <div className={'input-group ' +
                                    ((this.state.errors.predictPrice.length >
                                        0 &&
                                        this.state.selectedPredictValue ===
                                        'predictLesser'
                                    ) ? 'input-error' : '')}>
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
                                    {this.state.errors.predictPrice.length >
                                    0 &&
                                    (this.state.selectedPredictValue ===
                                        'predictLesser') &&
                                    <small
                                        className="form-text error-text">
                                      {this.state.errors.predictPrice}
                                    </small>
                                    }
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
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
                          className={classNames(styles['date-section'],
                              'row ' +
                              (this.state.errors.specified.length > 0 ?
                                  'date-error' :
                                  ''))}>
                        <div
                            className='col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4'>
                          {/*disabledDate={this.disabledSpecifiedDate}*/}
                          <DatePicker
                              onChange={this.onChangeSpecifiedDate}
                              format={dateFormat}
                              className={styles.time}/>
                          {this.state.errors.specified.length > 0 &&
                          <small
                              className="form-text error-text">
                            {this.state.errors.specified}
                          </small>
                          }
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                                             pr-xl-5  pl-xl-0 ">
                          {/*disabledHours={this.disabledHours}*/}
                          {/*disabledMinutes={this.disabledMinutes}*/}
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
                        </div>
                      </div>
                      {/*custom date*/}
                      <div
                          className={classNames(styles['date-section'],
                              'row ' +
                              (this.state.errors.expiration.length > 0 ?
                                  'date-error' :
                                  ''))}>
                        <div
                            className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 pr-xl-4">
                          {/*disabledDate={this.disabledExpirationDate}*/}
                          <DatePicker
                              onChange={this.onChangeExpirationDate}
                              disabled={this.state.selectedDateValue !==
                              'custom'}
                              format={dateFormat}
                              className={styles.time}/>
                          {this.state.errors.expiration.length > 0 &&
                          <small
                              className="form-text error-text">
                            {this.state.errors.expiration}
                          </small>
                          }
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6
                        pr-xl-5  pl-xl-0 ">
                          {/*disabledHours={this.disabledExpirationHours}*/}
                          {/*disabledMinutes={this.disabledExpirationMinutes}*/}
                          <TimePicker
                              format={format}
                              disabled={this.state.selectedDateValue !==
                              'custom'}
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
                          <div className={'input-group ' +
                          ((this.state.errors.betAmount.length > 0) ?
                              'input-error' :
                              '')}>
                            <input type="number"
                                   onChange={(event) => {
                                     this.setState({
                                       betAmount: event.target.value,
                                     });
                                   }}
                                   pattern="[0-9]*"
                                   className="form-control"
                                   placeholder="amount"/>
                            <div className="input-group-prepend">
                              <div className="input-group-text">TRX</div>
                            </div>
                          </div>
                          {this.state.errors.betAmount.length > 0 &&
                          <small
                              className="form-text error-text">
                            {this.state.errors.betAmount}
                          </small>
                          }
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
