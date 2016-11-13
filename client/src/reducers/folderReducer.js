import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.folder, action) {
    switch (action.type) {
        case types.FOLDER:
            return action.payload
        default:
            return state;
    }
}
