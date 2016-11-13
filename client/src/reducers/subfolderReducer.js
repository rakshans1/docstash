import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.subfolder, action) {
    switch (action.type) {
        case types.SUBFOLDER:
            return action.payload
        default:
            return state;
    }
}
