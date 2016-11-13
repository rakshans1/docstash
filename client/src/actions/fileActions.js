import axios from 'axios';
import {FILE, FOLDER, RECENT} from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import * as modalActions from './modalActions';
import ROOT_URL from '../baseurl';

export function files(token, type, folderId) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/files?folderId=${folderId}`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch({type: type, payload: response.data});
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

export function folders(token, type, folderId) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/folders?folderId=${folderId}`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch({type: type, payload: response.data});
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}
export function folderNew(folderName, token, location) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/folder/new/${folderName}?location=${location}&token=${token}`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch(folders(token, 'FOLDER', null))
            dispatch(modalActions.hideModal());
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}


export function recents(token) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/recents`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch({type: RECENT, payload: response.data});
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}
