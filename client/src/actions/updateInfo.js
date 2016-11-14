import axios from 'axios';
import {userInfo} from './userActions';

export default function updateInfo(token ,location) {
    return function(dispatch) {
        dispatch(userInfo(token, null, location));
    }
}
