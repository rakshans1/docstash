import React from 'react';
import CreateAccountScreen from './CreateAccountScreen';
import Header from '../common/HeaderWithoutLogin';

class Signup extends React.Component {
  render( ) {
    return(
      <div className="homepage">
        <Header {...this.props}/>
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
