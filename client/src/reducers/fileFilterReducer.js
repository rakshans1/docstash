import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.filefilter, action) {
    switch (action.type) {
        case types.FILEFILTER:
            return action.payload
        default:
            return state;
    }
}
