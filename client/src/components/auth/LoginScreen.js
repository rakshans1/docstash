import React, {PropTypes} from 'react';
import Input from './Input';
import _ from 'lodash';
import Icon from './Icon';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import toastr from 'toastr';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: null,
    };
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
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
  renderAlert() {
    if (this.props.errorMessage) {
      return toastr.error(this.props.errorMessage);
    }
  }

  isConfirmedPassword(event) {
    return (event == this.state.password);
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
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
    return(
      <div className="create_account_screen">

        <div className="create_account_form">
          <h1>LOGIN</h1>
          {this.renderAlert()}
            <form onSubmit={this.saveAndContinue}>
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
                <button
                  type="submit"
                  className="button button_wide">
                  LOGIN
                </button>
            </form>
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
  actions: PropTypes.object.isRequired
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
