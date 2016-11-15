import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import HomeWithoutLogin from './HomeWithoutLogin';
import Header from '../common/Header';
import Home from './Home';

class HomePage extends React.Component {
    // constructor(props) {
    //   super(props);
    // }
    pageshow() {
        if (!this.props.authenticated) {
            return (
                <div>
                    <HomeWithoutLogin {...this.props}/>
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
        return (
            <div>
                {this.pageshow()}
            </div>
        );
    }
}

HomePage.propTypes = {
    authenticated: PropTypes.bool
};

function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated, onlineUsers: state.ws.onlineUsers, search: state.search.status};
}

export default connect(mapStateToProps)(HomePage);
