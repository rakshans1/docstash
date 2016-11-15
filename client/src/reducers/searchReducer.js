import * as types from '../constants/actionTypes';
import initialState from './initialState';



export default function searchReducer(state = initialState.search, action) {
    if (action.type === types.SEARCHOPEN) {
        return state =  Object.assign({}, state, {
                            status: true,
                            payload: action.payload,
                        });
    } else if (action.type === types.SEARCHCLOSE) {
        return state = Object.assign({}, state, {
                            status: false,
                            payload: [],
                        });
    }
    return state;
}
