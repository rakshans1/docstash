import axios from 'axios';
import { ADD_WEATHER_SUCCESS } from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';

const API_KEY = 'ccdc65429545e5b39a567101fb13659d'
const URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchWeatherSucess(data) {
    return {type: ADD_WEATHER_SUCCESS, payload: data};
}

export function fetchWeather(city) {

    return function(dispatch) {
        dispatch(beginAjaxCall());
        const url = `${URL}&q=${city}`;
        axios.get(url).then(response => {
            dispatch(fetchWeatherSucess(response.data));
        }).catch((error) => {
            dispatch(ajaxCallError());
            dispatch(addNotification(error, 'error'));
        });
    };
}
