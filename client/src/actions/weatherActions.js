import axios from 'axios';
import { ADD_WEATHER_SUCCESS } from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import ROOT_URL from '../baseurl';

export function fetchWeatherSucess(data) {
    return {type: ADD_WEATHER_SUCCESS, payload: data};
}

export function fetchWeather(city) {

    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.post(`${ROOT_URL}/weather`, {city: city}).then(response => {
            dispatch(fetchWeatherSucess(response.data));
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification("No weather Data Found", 'error'));
        });
    };
}
