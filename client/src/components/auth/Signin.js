import React from 'react';
import Header from '../common/HeaderWithoutLogin';
import LoginScreen from './LoginScreen';

class Signin extends React.Component {
  render() {
    return(
      <div className="homepage">
        <Header/>
      <div className="application_wrapper">

        <div className="application_routeHandler">
            <LoginScreen/>
        </div>

      </div>
    </div>
    );
  }
}

export default Signin;
