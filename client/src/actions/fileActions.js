import axios from 'axios';
import {FILE} from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import ROOT_URL from '../baseurl';

export function files(token) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/files`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch({type: FILE, payload: response.data});
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}

export function download(fileId, token) {
  return function(dispatch) {
      const url = `${ROOT_URL}/file/d/${fileId}?token=${token}`;
      window.open(url, '_self');
      dispatch(addNotification('File Downloading', 'success'));
  }
}

export function remove(fileId, token) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
      axios.get(`${ROOT_URL}/file/rm/${fileId}`, {
          headers: {
              authorization: token
          }
      }).then(response => {
          dispatch(ajaxCallError());
          dispatch(addNotification(response.data.error, 'success'));
      }).catch(response => {
          dispatch(ajaxCallError());
          dispatch(addNotification('Can\'t Download File', 'error'));
      });
  }
}
