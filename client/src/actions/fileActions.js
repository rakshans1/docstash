import axios from 'axios';
import {FILE, FOLDER, RECENT, FILEFILTER, MUSIC } from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import * as modalActions from './modalActions';
import  {userInfo} from './userActions';
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

export function remove(fileId, token, type, location) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
      axios.post(`${ROOT_URL}/remove`,{fileId, type}, {
          headers: {
              authorization: token
          }
      }).then(response => {
          dispatch(ajaxCallError());
          dispatch(addNotification(response.data.message, 'success'));
          dispatch(userInfo(token, null, null, true));
          if (location === 'recents' || location === 'documents' || location === 'videos' || location === 'musics' || location === 'images') {
            dispatch(filefilter(token, location));
            dispatch(recents(token));
          } else if (location === null && type === 'file') {
            dispatch(files(token, 'FILE', null));
            dispatch(recents(token));
          } else if (type === 'file'){
            dispatch(files(token, 'SUBFILE', location));
            dispatch(recents(token));
          } else if (location === null && type === 'folder') {
            dispatch(folders(token, 'FOLDER', null));
          } else if (type === 'folder'){
            dispatch(folders(token, 'SUBFOLDER', location));
          }
      }).catch(response => {
          dispatch(ajaxCallError());
          dispatch(addNotification('Can\'t Remove', 'error'));
      });
  }
}

export function rename(fileId, newName, token, type, location) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
      axios.post(`${ROOT_URL}/rename`, {fileId , newName ,type},{
          headers: {
              authorization: token
          }
      }).then(response => {
          dispatch(ajaxCallError());
          dispatch(modalActions.hideModal());
          dispatch(addNotification(response.data.message, 'success'));
          if (location === 'search') return;
          if (location === 'recents' || location === 'documents' || location === 'videos' || location === 'musics' || location === 'images') {
            dispatch(filefilter(token, location));
            dispatch(recents(token));
          } else if (location === null && type === 'file') {
            dispatch(files(token, 'FILE', null));
            dispatch(recents(token));
          } else if (type === 'file'){
            dispatch(files(token, 'SUBFILE', location));
            dispatch(recents(token));
          } if (location === null && type === 'folder') {
            dispatch(folders(token, 'FOLDER', null));
          } else if (type === 'folder'){
            dispatch(folders(token, 'SUBFOLDER', location));
          }
      }).catch(response => {
          dispatch(ajaxCallError());
          dispatch(addNotification('Can\'t Rename', 'error'));
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
            if (location === null ) {
              dispatch(folders(token, 'FOLDER', null));
            } else {
              dispatch(folders(token, 'SUBFOLDER', location));
            }
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

export function filefilter(token, filefilter) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/files/${filefilter}`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch({type: FILEFILTER, payload: response.data});
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}

export function music(payload) {
  return {type: MUSIC, payload};
}

export function move(fileId, folderId, token, location, updateMainPage) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
      axios.post(`${ROOT_URL}/move`, {fileId , folderId},{
          headers: {
              authorization: token
          }
      }).then(response => {
          dispatch(ajaxCallError());
          dispatch(modalActions.hideModal());
          dispatch(addNotification(response.data.message, 'success'));
          if (location === 'search') return;
          if (location === 'recents' || location === 'documents' || location === 'videos' || location === 'musics' || location === 'images') {
            dispatch(filefilter(token, location));
          } else if (location === null) {
            dispatch(files(token, 'FILE', null));
          } else if (location != null){
            dispatch(files(token, 'SUBFILE', location));
          }
          if (updateMainPage) {
            dispatch(files(token, 'FILE', null));
          }
      }).catch(response => {
          dispatch(ajaxCallError());
          dispatch(addNotification('Can\'t Move', 'error'));
      });
  }
}
