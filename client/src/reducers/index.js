import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import pendingTasks from './ajaxStatusReducer';
import authReducer from './authReducer';
import notification from './notification';
import modalReducer from './modalReducer';
import user from './userReducer';
import shortnerReducer from './shortnerReducer';
import torrentReducer from './torrentReducer';
import wsReducer from './wsReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  pendingTasks,
  notification: notification,
  modal: modalReducer,
  user: user,
  shortner: shortnerReducer,
  torrent: torrentReducer,
  ws: wsReducer
});

export default rootReducer;
