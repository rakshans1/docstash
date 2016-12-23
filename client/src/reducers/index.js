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
import viewReducer from './viewReducer';
import fileReducer from './fileReducer';
import folderReducer from './folderReducer';
import recentReducer from './recentReducer';
import subfolderReducer from './subfolderReducer';
import subfileReducer from './subfileReducer';
import fileFilterReducer from './fileFilterReducer';
import searchReducer from './searchReducer';
import musicReducer from './musicReducer';

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
    view: viewReducer,
    file: fileReducer,
    folder: folderReducer,
    subfile: subfileReducer,
    subfolder: subfolderReducer,
    recent: recentReducer,
    filefilter: fileFilterReducer,
    search: searchReducer,
    music: musicReducer
});

export default rootReducer;
