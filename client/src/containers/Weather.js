import React, {PropTypes} from 'react';
import Input from '../components/Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as weatherActions from '../actions/weatherActions';
import WeatherList from '../components/main/sections/weather/WeatherList';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      city: ''
    };
    this.handleUrlInput = this.handleUrlInput.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }
  handleUrlInput(event) {
    this.setState({
      city: event.target.value
    });
  }
  saveAndContinue(e) {
    e.preventDefault();
      if(this.state.city.length > 0 ) {
        let data = {
          city: this.state.city,
        };
        this.props.actions.fetchWeather(data.city);
        this.setState({city: ''});
      } else {
        this.refs.weather.isValid();
      }
  }

  render() {
    return(
      <div className="col-sm-8 col-xs-12 shortner">
        <h1 className="text-sm-center shortner_h1">Weather Report 5 days</h1>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.saveAndContinue}>
                <Input
                text="Enter City Name"
                ref="weather"
                type="text"
                value={this.state.city}
                onChange={this.handleUrlInput}
                errorMessage="Url is invalid"
                emptyMessage="City Name is empty"
                errorVisible={this.state.showUrlError}
                />
                <button
                  type="submit"
                  className="button button_center">
                  Get Weather
                </button>
            </form>
        </div>
        </div>
        <WeatherList weather={this.props.weather}/>
      </div>


    );
  }
}
Weather.propTypes = {
  weather: PropTypes.array,
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return{ weather: state.weather };
}
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(weatherActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(Weather);
