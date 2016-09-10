import axios from 'axios';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import  ROOT_URL from '../baseurl';

export function torrentSearchSucess(data) {
  return {
    type: types.TORRENT_SEARCH_SUCCESS,
    payload: data
  };
}

export function torrentSearch(query) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/api/search/list`,{query})
      .then(response => {
        if (response.data.length === 0) {
          dispatch(addNotification('No Result Found', 'warning'));
        }
        dispatch(torrentSearchSucess(response.data));
      })
      .catch((error) => {
        dispatch(ajaxCallError());
        dispatch(addNotification('Torrent Search Error', 'error'));
      });
  };
}

export function torrentLoad(torrent, query, email) {
  return function(dispatch) {
    const data = torrent === "magnet" ? {magnet : query, email: email } : {torrent: query, email: email};
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/api/torrents/load`,data)
      .then(() => {
        dispatch(addNotification('Torrent Added', 'success'));
        dispatch(ajaxCallError());
      })
      .catch((error) => {
        dispatch(ajaxCallError());
        dispatch(addNotification(error.response.data, 'error'));
      });
  };
}
