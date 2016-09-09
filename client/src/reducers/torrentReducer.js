import { TORRENT_SEARCH_SUCCESS } from '../constants/actionTypes';
import initialState from './initialState';

export default function torrent(state = initialState.torrent, action) {
  switch (action.type) {
    case TORRENT_SEARCH_SUCCESS:
    return Object.assign({}, state, {
      search : action.payload,
    });
    default:
        return state;
  }
}
