
import {ADD_WEATHER_SUCCESS} from '../constants/actionTypes';
import initialState from './initialState';

export default function shortner(state = initialState.weather, action) {
    switch (action.type) {
        case ADD_WEATHER_SUCCESS:
            return [action.payload, state[0] , state[1], state[2], state[3], state[4]]
        default:
            return state;
    }
}
