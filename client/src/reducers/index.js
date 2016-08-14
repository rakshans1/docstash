import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authReducer from './authReducer';
import notification from './notification';


const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  notification: notification
});

export default rootReducer;
