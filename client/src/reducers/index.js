import {combineReducers} from 'redux';
// import {routerReducer} from 'react-router-redux';
import pendingTasks from './ajaxStatusReducer';
import authReducer from './authReducer';
import notification from './notification';
import modalReducer from './modalReducer';
import user from './userReducer';
import shortnerReducer from './shortnerReducer';
import weatherReducer from './weatherReducer';
import torrentReducer from './torrentReducer';
import wsReducer from './wsReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
    // routing: routerReducer,
    auth: authReducer,
    pendingTasks,
    notification: notification,
    modal: modalReducer,
    user: user,
    shortner: shortnerReducer,
    weather: weatherReducer,
    torrent: torrentReducer,
    ws: wsReducer,
    file: fileReducer
});

export default rootReducer;
