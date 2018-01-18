// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';
import cx         from 'classnames';

const Badges = ({
       type,
       number
   }) => {
    return (
        <span
            className={
                cx({
                    label: true,
                    'badge': type === 'default',
                    'badge badge-primary': type === 'primary',
                    'badge badge-success': type === 'success',
                    'badge badge-info': type === 'info',
                    'badge badge-warning': type === 'warning',
                    'badge badge-danger': type === 'danger',
                    'badge badge-inverse': type === 'inverse'
                })
            }>
      {  number }
    </span>
    );
};

Badges.propTypes = {
    number: PropTypes.number,
    type: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'inverse', 'warning', 'danger'])
};

Badges.defaultProps = {
    number: 0,
    type: 'default'
};

export default Badges;
