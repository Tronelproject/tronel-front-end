import React, {Fragment} from 'react';
import classNames from 'classnames';

export default (props) => (
    <Fragment>
      <div className="row">
        <div className="col-6">
          <h1 className="page-title">{props.title}</h1>
        </div>
        <div className="col-6 text-right pr-0">
          <button className={classNames(props.h ? 'active-layout': '','btn layout-btn')}
                  onClick={props.horizontallyHandler}>
            <span className="icon-menu-horizentally"/>
          </button>
          <button className={classNames(props.v ? 'active-layout': '','btn layout-btn')}
                  onClick={props.verticallyHandler}>
            <span className="icon-menu-vertically"/>
          </button>
        </div>
      </div>
    </Fragment>
)
