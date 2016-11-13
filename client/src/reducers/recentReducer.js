import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.recent, action) {
    switch (action.type) {
        case types.RECENT:
            return action.payload
        default:
            return state;
    }
}
