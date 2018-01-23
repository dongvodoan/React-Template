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
import ReactModal from 'react-modal';
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
  enterRegister: () => void,
  leaveRegister: () => void,

  // userAuth:
  isAuthenticated: boolean,
  isError: boolean,
  isFetching: boolean,
  isRegistering: boolean,
  registerUser: (
    username: string,
    email: string,
    password: string,
    confirm_password: string,
  ) => any,
};

type
  State = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};
// #endregion

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Username is required'
  } else if (values.username.length < 6) {
    errors.username = 'Username is at least 6 character'
  }
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password is at least 6 characters'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password and confirm password does not match'
  }
  return errors
}

const modalStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Register extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
  }

  // #region propTypes
  static propTypes = {
    // react-router 4:
    match:            PropTypes.object.isRequired,
    location:         PropTypes.object.isRequired,
    history:          PropTypes.object.isRequired,

    // containers props:
    currentView:      PropTypes.string.isRequired,
    enterRegister:    PropTypes.func.isRequired,
    leaveRegister:    PropTypes.func.isRequired,

    // userAuth:
    isAuthenticated:  PropTypes.bool,
    isError:          PropTypes.bool,
    errorMessage:     PropTypes.string,
    isFetching:       PropTypes.bool,
    isRegistering:    PropTypes.bool,
    registerUser:     PropTypes.func.isRequired,

  };
  // #endregion

  static defaultProps = {
    isFetching:      false,
    isRegistering:   true
  };

  state = {
    username:         '',
    email:            '',
    password:         '',
    confirmPassword:  '',
  };


  // #region lifecycle methods
  componentDidMount() {
    const {
      enterRegister,
    } = this.props;

    enterRegister();
  }

  componentWillUnmount() {
    const { leaveRegister } = this.props;
    leaveRegister();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAccountCreated)
      this.setState({ showModal: true })
  }

  renderField = ({ input, label, type, fieldValue, trans, meta: { touched, error, warning } }) => {
    return (
      <div className="form-group">
        <label
          className="col-lg-2 control-label"
        >
          {trans(label)}
        </label>
        <div className="col-lg-10">
          <input
            {...input}
            placeholder={label}
            type={type}
            className='form-control'
            id={label}
            value={fieldValue}
            onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
          />
          {touched && ((error && <span>{trans(error)}</span>) || (warning && <span>{trans(warning)}</span>))}
        </div>
      </div>
    )
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
    } = this.state;

    const {
      isRegistering,
      isError,
      errorMessage
    } = this.props;

    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (

            <div className="content">
              <button onClick={this.handleOpenModal.bind(this)}>open</button>
              <ReactModal
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example"
                style={modalStyles}
              >
                <div className="text-center">
                  <div className="align-middle">
                    <h2 style={{ color: 'green' }}>Register successfully!</h2>
                    <Row>
                      <Col md={5} mdOffset={1}>
                        <Button bsStyle="default" onClick={this.goHome}>Back to home</Button>
                      </Col>
                      <Col md={5} mdOffset={1}>
                        <Button bsStyle="info" onClick={this.goToLogin}>Go to login</Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </ReactModal>
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
                          {t("Register")}
                        </h2>
                      </legend>

                      <div className="text-center">{isError ? <span className="text-danger">{errorMessage}</span>: null}</div>

                      <Field
                        name="username"
                        type="text"
                        component={this.renderField}
                        label={t('User name')}
                        fieldValue={username}
                        trans={t}
                      />
                      <Field
                        name="email"
                        type="email"
                        component={this.renderField}
                        label={t('Email')}
                        fieldValue={email}
                        trans={t}
                      />
                      <Field
                        name="password"
                        type="password"
                        component={this.renderField}
                        label={t('Password')}
                        fieldValue={password}
                        trans={t}
                      />
                      <Field
                        name="confirmPassword"
                        type="password"
                        component={this.renderField}
                        label={t('Confirm password')}
                        fieldValue={confirmPassword}
                        trans={t}
                      />

                      <div className="form-group">
                        <Col
                          lg={10}
                          lgOffset={2}
                        >
                          <Button
                            className="register-button btn-block"
                            bsStyle="success"
                            disabled={isRegistering}
                            onClick={this.handlesOnRegister}>
                            {
                              isRegistering
                                ?
                                <span>
                                  {`${t('Registering')}...`}
                                  &nbsp;
                                  <i
                                    className="fa fa-spinner fa-pulse fa-fw"
                                  />
                          </span>
                                :
                                <span>
                            {t('Register')}
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
                      {t('Back to home')}
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

  // #region on login button click callback
  handlesOnRegister = async (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      registerUser,
    } = this.props;

    const {
      username,
      email,
      password,
      confirmPassword,
    } = this.state;

    try {
      registerUser(username, email, password, confirmPassword);
    } catch (error) {
      /* eslint-disable no-console */
      console.log('register went wrong..., error: ', error);
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

  goToLogin = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      history
    } = this.props;

    history.push({ pathname: '/login' });
  }
}

export default reduxForm({
  form: 'syncValidation',
  validate,
})(Register)
