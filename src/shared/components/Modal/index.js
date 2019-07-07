import React, {Fragment} from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import wallet from 'Root/assets/images/wallet-circle.svg'

const BasicModal = (props) => {
  return (
      <Fragment>
        <div className="p-vh-center">
        <Modal isOpen={props.modal} toggle={props.toggle}
               className={classnames(styles.modal)}>
         <div className="row">
           <div className="col-12 text-right w-100">
             <button className="btn close p-vh-center" onClick={props.toggle}>
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
};

export default BasicModal;
