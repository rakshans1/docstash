import React from 'react';
import CreateAccountScreen from './CreateAccountScreen';
import {Link} from 'react-router';
import Header from '../common/HeaderWithoutLogin';

class Signup extends React.Component {
  render( ) {
    return(
      <div className="homepage">
        <Header/>
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
