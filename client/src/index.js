/* eslint-disable import/default */
// import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
require('./assets/favicon.ico');
require('./manifest.json');
import './assets/styles/main.sass';
import './assets/icon/flaticon.css';
// import { syncHistoryWithStore } from 'react-router-redux';
import {userInfo} from './actions/userActions';

class Root extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(() => this.setState({isLoading: false}))
        };
    }
    render() {
        if (this.state.isLoading) {
            return null;
        }
        const state = this.state.store.getState();
        if (state.auth.authenticated) {
            this.state.store.dispatch(userInfo(state.auth.token));
        }
        // const history = syncHistoryWithStore(browserHistory, this.state.store);
        return (
            <Provider store={this.state.store}>
                <Router history={browserHistory} routes={routes}/>
            </Provider>
        );
    }
}

render(
    <Root/>, document.getElementById('app'));
