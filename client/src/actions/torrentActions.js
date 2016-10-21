import axios from 'axios';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import ROOT_URL from '../baseurl';

export function torrentSearchSucess(data, query) {
    return {type: types.TORRENT_SEARCH_SUCCESS, data: data, query: query};
}

export function torrentSearch(query) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/search/list`, {query}).then(response => {
            if (response.data.length === 0) {
                dispatch(addNotification('No Result Found', 'warning'));
            }
            dispatch(torrentSearchSucess(response.data, query));
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification('Torrent Search Error', 'error'));
        });
    };
}

export function torrentLoad(torrent, query, email) {
    return function(dispatch) {
        const data = torrent === "magnet"
            ? {
                magnet: query,
                email: email
            }
            : {
                torrent: query,
                email: email
            };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/load`, data).then(() => {
            dispatch(addNotification('Torrent Added', 'success'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}

export function torrentStop(hash) {
    return function(dispatch) {
        const data = {
            hash: hash
        };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/close`, data).then(() => {
            dispatch(addNotification('Torrent Stopped', 'info'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}
export function torrentRemove(hash) {
    return function(dispatch) {
        const data = {
            hash: hash
        };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/remove`, data).then(() => {
            dispatch(addNotification('Torrent Removed', 'success'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}

export function torrentOpen(hash) {
    return function(dispatch) {
        const data = {
            hash: hash
        };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/open`, data).then(() => {
            dispatch(addNotification('Torrent Resumed', 'info'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}

export function torrentzipAll(hash) {
    return function(dispatch) {
        const data = {
            hash: hash
        };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/zipALL`, data).then(() => {
            dispatch(addNotification('Torrent Zipping', 'info'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}

export function torrentdownloadFile(hash, path) {
    return function(dispatch) {
        const data = {
            hash: hash,
            path: path
        };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/downloadFile`, data).then(() => {
            dispatch(addNotification('File Downloading', 'info'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}

export function torrentcancelFile(hash, path) {
    return function(dispatch) {
        const data = {
            hash: hash,
            path: path
        };
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/api/torrents/cancelFile`, data).then(() => {
            dispatch(addNotification('File Stopped', 'info'));
            dispatch(ajaxCallError());
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error.response.data, 'error'));
        });
    };
}
