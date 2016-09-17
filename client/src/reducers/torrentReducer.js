import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function torrent(state = initialState.torrent, action) {
  switch (action.type) {
    case types.TORRENT_SEARCH_SUCCESS:
    return Object.assign({}, state, {
      search : action.data,
    }, {input: action.query});
    default:
        return state;
  }
}
