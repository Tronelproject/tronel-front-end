import React, {Component} from 'react';
import classNames from 'classnames';

import copyText from 'Root/helpers/copyText.js';
import checkIcon from 'Root/assets/images/checked.png';
import copyIcon from 'Root/assets/images/copy.png';

import styles from './styles.less';

class CopyText extends Component {
  state = {
    img: copyIcon,
    className: styles.copied,
  };

  handleCopy = () => {
    copyText(this.props.text);

    this.setState({
      img: checkIcon,
      className: classNames(styles.copied, styles.show),
    });

    setTimeout(() => {
      this.setState({
        img: copyIcon,
        className: styles.copied,
      });
    }, 500);
  };

  render() {
    return (
        <span className={styles.container}>
          <img src={this.state.img} alt="Icon" onClick={this.handleCopy}
               className={styles.copy}/>

          <p className={this.state.className}>Copied!</p>
        </span>
    );
  }
}

export default CopyText;
