import axios from 'axios';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import ws from './wsAction'
import * as file from './fileActions';
import {signoutUser} from './authActions';
import ROOT_URL from '../baseurl';

export function userInfo(token, firstTime, location, storageOnly) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/user`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch({type: types.USERS_INFO_SUCCESS, payload: response.data});
            if(storageOnly) return;
            if (location === '' || location === undefined) {
              dispatch(file.files(token, 'FILE', null));
              dispatch(file.folders(token, 'FOLDER', null));
            } else {
              dispatch(file.files(token, 'SUBFILE', location));
            }
            dispatch(file.recents(token));
            if (firstTime) dispatch(ws(response.data.email));
        }).catch(response => {
            dispatch(ajaxCallError());
            // dispatch(signoutUser());
        });
    }
}
