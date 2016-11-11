import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.file, action) {
    switch (action.type) {
        case types.FILE:
            return action.payload
        default:
            return state;
    }
}
