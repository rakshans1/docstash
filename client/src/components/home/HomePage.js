import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import HomeWithoutLogin from './HomeWithoutLogin';
import Header from '../common/Header';
import Home from './Home';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  pageshow() {
    if(!this.props.authenticated) {
      return (
        <div>
        <HomeWithoutLogin/>
        </div>
      );
    }
    return (
      <div>
        <Header {...this.props}/>
        <Home {...this.props}/>
      </div>
    );
  }
  render() {
    return(
      <div>
        {this.pageshow()}
      </div>
    );
  }
}

HomePage.propTypes ={
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(HomePage);
