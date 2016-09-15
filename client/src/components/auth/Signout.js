import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';

class Signout extends React.Component {
  componentWillMount() {
    this.props.actions.signoutUser();
  }

  render() {
    return null;
  }
}
Signout.propTypes = {
  actions: PropTypes.object.isRequired
};
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(null, mapDispatchToProp)(Signout);
