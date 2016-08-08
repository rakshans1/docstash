import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
