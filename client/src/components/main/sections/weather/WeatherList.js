import React, {PropTypes} from 'react';
import WeatherChart from './WeatherChart';

class WeatherList extends React.Component {
  renderWeather(cityData, i) {
    if (cityData === null || cityData === undefined) return;
    const name = cityData.city.name;
    const todayTemp = Math.floor(cityData.list[0].main.temp - 273);
    const todayweather = cityData.list[0].weather[0].description;
    const todaywind= cityData.list[0].wind.speed;
    const temps = cityData.list.map(weather => weather.main.temp - 273);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);

    return(
      <tr key={i}>
        <td style={{paddingTop: 50  + 'px' }}><div style={{color: "green"}}>{name} </div>Today: {todayTemp} °C<br/>weather: {todayweather}<br/>wind: {todaywind} m/s</td>
        <td>
            <WeatherChart data={temps} color="orange" units="°C"/>
        </td>
        <td>
            <WeatherChart data={pressure} color="green" units="hPa"/>
        </td>
        <td>
            <WeatherChart data={humidity} color="black" units="%"/>
        </td>
      </tr>
    );
  }
    render() {
        return (

        <div className="card card-inverse card-outline-success shortner-link">
          <div className="card-block">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th className="text-xs-center">Avg Temperature (°C)</th>
                        <th className="text-xs-center">Avg Pressure (hPa)</th>
                        <th className="text-xs-center">Avg Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
            </div>
          </div>
        );
    }
}
WeatherList.propTypes = {
  weather: PropTypes.array
}
export default WeatherList;
