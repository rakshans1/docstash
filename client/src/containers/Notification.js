import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNotification} from '../actions/notificationActions';
import NotificationSystem from 'react-notification-system';

class NotificationContainer extends React.Component {
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
        const {message, level} = newProps.notification;
        this.notificationSystem.addNotification({message, level});
    }

    render() {
        return (<NotificationSystem ref="notificationSystem"/>);
    }
}
function mapStateToProps(state) {
    return {notification: state.notification};
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({
            addNotification
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProp)(NotificationContainer);
