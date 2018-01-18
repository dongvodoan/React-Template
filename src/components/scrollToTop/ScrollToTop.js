// @flow weak
// eslint-disable-next-line
import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import { withRouter } from 'react-router';

// #region flow types
type Props = any;
type State = any;
// #endregion

class ScrollToTop extends Component<Props, State> {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    children: PropTypes.node
  };

  componentDidUpdate(prevProps) {
    if (window) {
      const { location: prevLocation } = prevProps;
      const { location: nextLocation } = this.props;

      if (prevLocation !== nextLocation) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
