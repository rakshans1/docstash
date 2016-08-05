// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
// import Header from './common/Header';
// import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object.isRequired,
};


export default App;
