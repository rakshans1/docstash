import axios from 'axios';
import {userInfo} from './userActions';

export default function updateInfo(token) {
    return function(dispatch) {
        dispatch(userInfo(token));
    }
}
