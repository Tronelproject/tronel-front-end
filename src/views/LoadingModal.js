import React from 'react';
import { connect } from 'react-redux';
import BasicModal from 'Root/shared/components/Modal';

const LoadingModal = (props) => (
  <BasicModal
      warningStatus={props.modalStatus}
      type={'loading'}
      title={'Don’t refresh or close the page'}
      text={'Please wait, your request is being processed, it may takes a minute'}
  />
);

export default connect(state => ({ modalStatus: state.loadingModal }))(LoadingModal);
