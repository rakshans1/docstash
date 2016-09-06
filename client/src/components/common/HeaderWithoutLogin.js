import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

class HeaderWithoutLogin extends React.Component{
  constructor(props) {
    super(props);
    this.login = this.renderbutton.bind(this);
  }
  renderbutton() {
    const location = this.props.location.pathname;
    if (location === 'login') {
      return (
        <Link to="signup"><button className="hp-btn">SIGN UP</button></Link>
      );
    } else {
      return (
        <Link to="login"><button className="hp-btn">LOGIN</button></Link>
      );
    }
  }
  render() {
    return(
      <nav className="navbar navbar-light">
        <img src={require('../../assets/img/logo.svg')}  className="brand-img" alt="" />
        <IndexLink to="/" className="navbar-brand ">Docstash</IndexLink>

        <div className="pull-xs-right">
          {this.renderbutton()}
        </div>
      </nav>
    );
  }
}
HeaderWithoutLogin.propTypes = {
  location: PropTypes.object
}
export default HeaderWithoutLogin;
