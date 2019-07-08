import React, {Fragment, Component} from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import {Modal, ModalBody} from 'reactstrap';
import { connect } from 'react-redux';
import wallet from 'Root/assets/images/wallet-circle.svg';

class BasicModal extends Component {
  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    return (
        <Fragment>
          <div className="p-vh-center">
            <Modal isOpen={this.props.modalStatus} toggle={this.toggle}
                   className={classnames(styles.modal)}>
              <div className="row">
                <div className="col-12 text-right w-100">
                  {/*{props.modal | JSON}*/}
                  <button className="btn close p-vh-center"
                          onClick={this.toggle}>
                    <span className="icon-remove c-vh-center"/>
                  </button>
                </div>
              </div>
              {/*<ModalHeader />*/}
              <ModalBody className="pt-0">
                <img src={wallet} alt="wallet" className="d-block mx-auto"/>
                <h1 className={styles.title}>Please open your Tronlink</h1>
                <h5 className={styles.message}>
                  Haven't installed Tronlink yet?
                  <button className="btn pl-1">Click here</button>
                </h5>
              </ModalBody>
            </Modal>
          </div>
        </Fragment>
    );
  }
};

export default connect(state => ({ modalStatus: state.modal }))(BasicModal);
