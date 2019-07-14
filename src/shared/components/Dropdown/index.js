import React from 'react';
import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import styles from './styles.less';


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
            <button type="button" className={classNames(styles.dropdownButton,'w-100')}>
              <span className="float-left">{title}</span>
              <span className="icon-angle-down float-right"/>
            </button>
          </Dropdown>
        </div>
      </div>
  );
}

export default Dropdowns;
