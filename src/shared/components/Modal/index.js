import React, {Fragment, Component} from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import {Modal, ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import wallet from 'Root/assets/images/wallet-circle.svg';
import loading from 'Root/assets/images/clock.svg';
import warning from 'Root/assets/images/warning.svg';

class BasicModal extends Component {
  state = {
    isOpen: this.props.modalStatus,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if ((nextProps.modalStatus !== this.state.isOpen) &&
        this.props.type === 'tronLink') {
      this.setState({isOpen: nextProps.modalStatus});
    } else {
      this.setState({isOpen: nextProps.warningStatus});
      // console.warn(nextProps.warningStatus);
    }
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    let img = null;
    if (this.props.type === 'tronLink') img = wallet;
    if ((this.props.type === 'acceptWarning') ||
        (this.props.type === 'deactivateWarning')) img = warning;
    if (this.props.type === 'loading') img = loading;
    return (
        <Fragment>
          <div className="p-vh-center">
            <Modal isOpen={this.state.isOpen}
                   className={classnames(styles.modal)}>
              {
                (this.props.type === 'acceptWarning' ||
                    this.props.type === 'deactivateWarning') ?
                    (<div className="row">
                      <div className="col-12 text-right w-100">
                        <button className="btn close p-vh-center"
                                onClick={this.toggle}>
                          <span className="icon-remove c-vh-center"/>
                        </button>
                      </div>
                    </div>) : ''
              }
              <ModalBody
                  className={(this.props.type === 'tronLink'
                      || this.props.type === 'loading') ? 'pt-5 ' : 'pt-0 ' +
                  (this.props.type === 'loading') ? 'pb-1' : ''}>
                <img src={img} alt="wallet"
                     className="d-block mx-auto mt-3"/>
                <h1 className={styles.title}>{this.props.title}</h1>
                <h5 className={classnames(styles.message, 'px-5', (this.props.type === 'loading')? 'mb-3': '')}>
                  {this.props.text}{' '}
                  {this.props.type === 'tronLink' ?
                      (<a href="https://www.tronlink.org/" className="pl-1"
                          target="_blank">Click here</a>) : ''}
                </h5>
                {
                  this.props.type === 'loading' ? (
                      <div className={styles.actionCon}>
                        <div className="actionType mb-2">
                          <div className="loding1" />
                          <div className="loding2" />
                          <div className="loding3" />
                        </div>
                      </div>
                  ) : ''
                }
              </ModalBody>
            </Modal>
          </div>
        </Fragment>
    );
  }
};

export default connect(state => ({modalStatus: state.modal}))(BasicModal);
