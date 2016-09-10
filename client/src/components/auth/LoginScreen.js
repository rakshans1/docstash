import React, {PropTypes} from 'react';
import Input from './Input';
import _ from '../../utils/lobash'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import classNames from 'classnames';
import ROOT_URL from '../../baseurl';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: null,
      owl_arm_visible: false
    };
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value,
      owl_arm_visible: true
    });
  }

  saveAndContinue(e) {
    e.preventDefault();

    let canProceed = this.validateEmail(this.state.email);

      if(canProceed) {
        let data = {
          email: this.state.email,
          password: this.state.password,
        };
        this.props.actions.signinUser(data.email, data.password);
      } else {
        this.refs.email.isValid();
        this.refs.password.isValid();
      }
  }
  resetPassword(e) {
    e.preventDefault();
    let canProceed = this.validateEmail(this.state.email);
    if(canProceed) {
      let data = {
        email: this.state.email,
      };
      this.props.actions.resetPassword(data.email);
    } else {
      this.refs.email.isValid();
      this.refs.password.isValid();
    }
  }
  isConfirmedPassword(event) {
    return (event === this.state.password);
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
                  value={this.state.password}
                  emptyMessage="Password is invalid"
                  onChange={this.handlePasswordInput}
                />
                <a onClick={this.resetPassword} className="login_a">Forgot Password..???</a>
                <button
                  type="submit"
                  className="button button_wide">
                  LOGIN
                </button>
            </form>
            <h5 className="or">OR</h5>
            <div className="row">
            <button className="btn-social" >
                  <a href={`${ROOT_URL}/auth/google`}>
                    <img className="social-img" src={require('../../assets/img/google.svg')}/>
                  </a>
              </button>
            <button className="btn-social">
                  <a href={`${ROOT_URL}/auth/facebook`}>
                    <img className="social-img" src={require('../../assets/img/facebook.svg')}/>
                  </a>
            </button>
            </div>
        </div>
      </div>
    );
  }
}

LoginScreen.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProp)(LoginScreen);
