import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.subfile, action) {
    switch (action.type) {
        case types.SUBFILE:
            return action.payload
        default:
            return state;
    }
}
