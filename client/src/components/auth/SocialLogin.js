import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';

class SocialLogin extends React.Component {
    componentWillMount() {
        const queryParams = this.props.location.query.code;
        this.props.actions.googleLogin(queryParams);
    }
    render() {

        return false;
    }
}
SocialLogin.propTypes = {
    location: PropTypes.object,
    actions: PropTypes.object.isRequired
};

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}
export default connect(null, mapDispatchToProp)(SocialLogin);
