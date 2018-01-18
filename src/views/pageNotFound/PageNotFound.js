// @flow weak
import React, {
  PureComponent
}                       from 'react';
import PropTypes        from 'prop-types';
import { AnimatedView }     from '../../components';

// #region flow types
type
Props = any;
type
State = any;
// #endregion

class PageNotFound extends PureComponent<Props, State> {
  static propTypes = {
    actions: PropTypes.shape({
      enterPageNotFound: PropTypes.func.isRequired,
      leavePageNotFound: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    const { 
      actions: {
        enterPageNotFound
      } 
    } =  this.props;
    enterPageNotFound();
  }

  componentWillUnmount() {
    const { 
      actions: {
        leavePageNotFound
      }
    } = this.props;
    leavePageNotFound();
  }

  render() {
    return(
      <AnimatedView>
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="not-found">
                <i class="fa fa-frown-o fa-spin">
                </i>
              &nbsp;
              Sorry... This page does not exist
            </h2>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default PageNotFound;
