// @flow strong

// #region imports
import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {
  Row,
  Col,
  Button
}                     from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { I18n } from 'react-i18next';
// import auth           from '../../services/auth';
// #endregion

// #region flow types
type
  Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // containers props:
  currentView: string,
  errorMessage: string,
  enterLogin: () => void,
  leaveLogin: () => void,

  // userAuth:
  isAuthenticated: boolean,
  isError: boolean,
  isFetching: boolean,
  isLogging: boolean,
  disconnectUser: () => any,
  logUserIfNeeded: (email: string, password: string) => any
};

type
  State = {
  email: string,
  password: string
};
// #endregion

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password is at least 6 character'
  }
  return errors
}

class Login extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
  }

  // #region propTypes
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // containers props:
    currentView: PropTypes.string.isRequired,
    enterLogin:  PropTypes.func.isRequired,
    leaveLogin:  PropTypes.func.isRequired,

    // userAuth:
    isAuthenticated: PropTypes.bool,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isFetching:      PropTypes.bool,
    isLogging:       PropTypes.bool,
    disconnectUser:  PropTypes.func.isRequired,
    logUserIfNeeded: PropTypes.func.isRequired,

  };
  // #endregion

  static defaultProps = {
    isFetching:      false,
    isLogging:       true
  };

  state = {
    email:          '',
    password:       ''
  };


  // #region lifecycle methods
  componentDidMount() {
    const {
      enterLogin,
      // disconnectUser
    } = this.props;

    // disconnectUser(); // diconnect user: remove token and user info
    enterLogin();
  }

  componentWillUnmount() {
    const { leaveLogin } = this.props;
    leaveLogin();
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.isAuthenticated)
      history.push('/');
  }

  renderField = ({ input, label, type, fieldValue, test, meta: { touched, error, warning } }) => {
    return (
      <div className="form-group">
        <label
          className="col-lg-2 control-label"
        >
          {label}
        </label>
        <div className="col-lg-10">
          <input
            {...input}
            placeholder={label}
            type={type}
            className='form-control'
            id={label}
            value={fieldValue}
            onChange={e => this.setState({ [type]: e.target.value.trim() })}
          />
          {touched && ((error && <span>{test(error)}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
  }

  render() {
    const {
      email,
      password
    } = this.state;

    const {
      isLogging,
      isError,
      errorMessage
    } = this.props;

    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (

            <div className="content">
              <Row>
                <Col
                  md={4}
                  mdOffset={4}
                  xs={10}
                  xsOffset={1}
                >
                  <button onClick={() => i18n.changeLanguage('en')}>en</button>
                  <button onClick={() => i18n.changeLanguage('vn')}>vn</button>
                  <button onClick={() => i18n.changeLanguage('ja')}>ja</button>
                  <form
                    className="form-horizontal"
                    noValidate>
                    <fieldset>
                      <legend
                        className="text-center"
                      >
                        <h1>
                          <i className="fa fa-3x fa-user-circle" aria-hidden="true" />
                        </h1>
                        <h2>
                          {t("login")}
                        </h2>
                      </legend>

                      <div className="text-center">{isError ? <span className="text-danger">{errorMessage}</span>: null}</div>

                      <Field name="email" type="email" component={this.renderField} label={t('email')} fieldValue={email}/>
                      <Field name="password" type="password" component={this.renderField} label={t('password')} fieldValue={password}/>
                      <div className="form-group">
                        <Col
                          lg={10}
                          lgOffset={2}
                        >
                          <Button
                            className="login-button btn-block"
                            bsStyle="primary"
                            disabled={isLogging}
                            onClick={this.handlesOnLogin}>
                            {
                              isLogging
                                ?
                                <span>
                                  {t('login in...')}
                                  &nbsp;
                                  <i
                                    className="fa fa-spinner fa-pulse fa-fw"
                                  />
                          </span>
                          :
                          <span>
                            {t('login')}
                          </span>
                            }
                          </Button>
                        </Col>
                      </div>
                    </fieldset>
                  </form>
                </Col>
              </Row>
              <Row>
                <Col
                  md={4}
                  mdOffset={4}
                  xs={10}
                  xsOffset={1}
                >
                  <div
                    className="pull-right"
                  >
                    <Button
                      bsStyle="default"
                      onClick={this.goHome}
                    >
                      {t('back to home')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
      </I18n>

    );
  }
  // #endregion

  // #region form inputs change callbacks
  handlesOnEmailChange = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
      let target: Object = event.target;
      // should add some validator before setState in real use cases
      this.setState({ email: target.value.trim() });
    }
  }

  handlesOnPasswordChange = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
      let target: Object = event.target;
      // should add some validator before setState in real use cases
      this.setState({ password: target.value.trim() });
    }
  }
  // #endregion


  // #region on login button click callback
  handlesOnLogin = async (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      logUserIfNeeded,
    } = this.props;

    const {
      email,
      password
    } = this.state;

    try {
      logUserIfNeeded(email, password);
    } catch (error) {
      /* eslint-disable no-console */
      console.log('login went wrong..., error: ', error);
      /* eslint-enable no-console */
    }
  };
  // #endregion

  // #region on go back home button click callback
  goHome = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      history
    } = this.props;

    history.push({ pathname: '/' });
  }
  // #endregion
}

export default reduxForm({
  form: 'syncValidation',
  validate,
})(Login)
