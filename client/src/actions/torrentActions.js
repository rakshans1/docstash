import axios from 'axios';
import { TORRENT_SEARCH_SUCCESS } from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import  ROOT_URL from '../baseurl';

export function torrentSearchSucess(data) {
  return {
    type: TORRENT_SEARCH_SUCCESS,
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
