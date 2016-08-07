import React from 'react';
import CreateAccountScreen from './CreateAccountScreen';
import {Link} from 'react-router';

class Signup extends React.Component {
  render( ) {
    return(
      <div className="homepage">
          <nav className="navbar navbar-light">
              <img src={require('../../assets/img/logo.svg')} className="brand-img" alt=""/>
              <Link to="/" className="navbar-brand ">DocStash</Link>

              <div className="pull-xs-right">
                <a href=""><button className="hp-btn">LOGIN</button></a>
              </div>
            </nav>
      <div className="application_wrapper">

        <div className="application_routeHandler">
            <CreateAccountScreen/>
        </div>

      </div>
    </div>
    );
  }
}

export default Signup;
