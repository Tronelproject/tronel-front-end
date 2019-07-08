import React, {Fragment} from 'react';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import classNames from 'classnames';
import disable from 'Root/actions/myrequests/disable';
import styles from './styles.less';

const AlertModal = (props) => (
    <Fragment>
      <div className="p-vh-center">
        <Modal isOpen={props.modal} toggle={props.toggle}
               className={classNames(styles.modal)}>
          <ModalBody>
            <div className="row">
              <div className="col-1">
                <div className={classNames(styles.attention, 'p-vh-center')}>
                  <span className="icon-high-importance c-vh-center"/>
                </div>
              </div>
              <div className="col-11">
                <h1 className={styles.title}>Deactive Request</h1>
                <h5 className={styles.message}>
                  Are you sure you want to deactive this request?
                </h5>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className={classNames(styles.cancel, 'btn')}
                    onClick={props.toggle}>
              Cancel
            </button>
            <button className={classNames(styles.deactive, 'btn')}
                    onClick={() => {
                      props.toggle();
                      disable(props.bet._id);
                    }}>
              Deactive
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
);

export default AlertModal;
