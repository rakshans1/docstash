import React, {PropTypes} from 'react';
import Input from './Input';
import _ from 'lodash';
import Icon from './Icon';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import classNames from 'classnames';

class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: null,
      confirmPassword: '',
      forbiddenWords: ["password", "user", "username"],
      owl_arm_visible: false
    };
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.isConfirmedPassword = this.isConfirmedPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  handlePasswordInput(event) {
    if(!_.isEmpty(this.state.confirmPassword)) {
      this.refs.passwordConfirm.isValid();
    }
    this.refs.passwordConfirm.hideError();
    this.setState({
      password: event.target.value,
      owl_arm_visible: true
    });
  }


  handleConfirmPasswordInput(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  saveAndContinue(e) {
    e.preventDefault();

    let canProceed = this.validateEmail(this.state.email)
      && this.refs.password.isValid()
      && this.refs.passwordConfirm.isValid();

      if(canProceed) {
        let data = {
          email: this.state.email,
          password: this.state.password,
        };
        this.props.actions.signupUser(data.email, data.password);
      } else {
        this.refs.email.isValid();
        this.refs.password.isValid();
        this.refs.passwordConfirm.isValid();
      }
  }

  isConfirmedPassword(event) {
    return (event == this.state.password);
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value,
      owl_arm_visible: false
    });
  }

  validateEmail(event) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  }

  isEmpty(value) {
    return !_.isEmpty(value);
  }

  render() {
    let owl = classNames({
      owl: true,
      'password': this.state.owl_arm_visible
    });
    let hand = classNames({
      hand: true,
      'password': this.state.owl_arm_visible
    });
    let hand_r = classNames({
      hand: true,
      'hand-r': true,
      'password': this.state.owl_arm_visible
    });
    let arms = classNames({
      arms: true,
      'password': this.state.owl_arm_visible
    });
    let arm = classNames({
      arm: true,
      'password': this.state.owl_arm_visible
    });
    let arm_r = classNames({
      arm: true,
      'arm-r': true,
      'password': this.state.owl_arm_visible
    });
    return(
      <div className="create_account_screen">

        <div className="create_account_form">
            <div className={owl}>
                <div className={hand} />
                <div className={hand_r} />
                <div className={arms} >
                    <div className={arm} />
                    <div className={arm_r} />
                </div>
            </div>
            <form className="form" onSubmit={this.saveAndContinue}>
                  <Input
                  text="Email Address"
                  ref="email"
                  type="text"
                  validate={this.validateEmail}
                  value={this.state.email}
                  onChange={this.handleEmailInput}
                  errorMessage="Email is invalid"
                  emptyMessage="Email can't be empty"
                  errorVisible={this.state.showEmailError}
                />
                <Input
                  text="Password"
                  type="password"
                  ref="password"
                  validator="true"
                  minCharacters="8"
                  requireCapitals="1"
                  requireNumbers="1"
                  forbiddenWords={this.state.forbiddenWords}
                  value={this.state.password}
                  emptyMessage="Password is invalid"
                  onChange={this.handlePasswordInput}
                />

                <Input
                  text="Confirm password"
                  ref="passwordConfirm"
                  type="password"
                  validate={this.isConfirmedPassword}
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPasswordInput}
                  emptyMessage="Please confirm your password"
                  errorMessage="Passwords don't match"
                />
                <button
                  type="submit"
                  className="button button_wide">
                  CREATE ACCOUNT
                </button>
            </form>
        </div>
      </div>
    );
  }
}

CreateAccountScreen.propTypes = {
  validateEmail: PropTypes.bool,
  minCharacters: PropTypes.string,
  forbiddenWords: PropTypes.array,
  requireNumbers: PropTypes.string,
  requireCapitals: PropTypes.string,
  errorMessage: PropTypes.string,
  actions: PropTypes.object.isRequired,
  owl_arm_visible: PropTypes.bool
};

function mapStateToProps(state) {
  return{ errorMessage: state.auth.error };
}
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(CreateAccountScreen);
