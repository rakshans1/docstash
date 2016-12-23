import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.view, action) {
    switch (action.type) {
        case types.VIEW:
            if (state === "grid") {
              return "list";
            } else {
              return "grid";
            }
        default:
            return state;
    }
}
