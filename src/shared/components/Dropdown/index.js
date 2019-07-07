import React from 'react';

import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';

import styles from './styles.less';
// import arrowdownIcon from 'Root/images/arrow-down.png';

function onVisibleChange(visible) {
  // console.log(visible);
}

function Dropdowns(props) {
  const {
    width,
    title,
    menu,
  } = props;

  return (
      <div>
        <div>
          <Dropdown
              trigger={['click']}
              overlay={menu}
              animation="slide-up"
              onVisibleChange={onVisibleChange}
          >
            <button type="button" className={styles.dropdownButton}>
              {title}
             <span className="icon-angle-down" />
            </button>
          </Dropdown>
        </div>
      </div>
  );
}

export default Dropdowns;
