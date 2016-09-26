import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import NotFound from './components/common/NotFound';
import HomePage from './components/home/HomePage';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import SocialLogin from './components/auth/SocialLogin';
import RequireAuth from './components/auth/RequireAuth';
import LoggedInRedirect from './components/auth/LoggedInRedirect';
import Main from './components/main/Main';
import Shortner from './components/main/sections/Shortner';
import Twitter from './components/main/sections/Twitter';
import Torrent from './components/main/sections/Torrent';

export default(
    <Route path="/" component={App}>
        <Route component={HomePage}>
            <IndexRoute component={Main}/>
            <Route path="/short" component={Shortner}/>
            <Route path="/twitter" component={Twitter}/>
            <Route path="/torrent" component={Torrent}/>
        </Route>
        <Route path="/signup" component={LoggedInRedirect(Signup)}/>
        <Route path="/login" component={LoggedInRedirect(Signin)}/>
        <Route path="/signout" component={RequireAuth(Signout)}/>
        <Route path="/auth" component={LoggedInRedirect(SocialLogin)}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
