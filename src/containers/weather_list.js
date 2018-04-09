import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

  renderWeather(cityData){
    function  convertToF(f){
     return f * 9/5 - 459.67
    }
    const name = cityData.city.name;
    var temps = cityData.list.map(weather => weather.main.temp);
    const fahrenheit  =  _.map(temps, convertToF);
    const pressures = cityData.list.map(weather=> weather.main.pressure);
    const humidities = cityData.list.map(weather=> weather.main.humidity);
    //const lon = cityData.city.coord.lon; const lat = cityData.city.coord.lat;
    const { lon, lat } = cityData.city.coord;
    return(
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={fahrenheit} color="orange" units="F" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="gray" units="%" /> </td>
      </tr>
    )
  };

  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidty (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({weather}){
    return { weather } /// ==== weather: weather
}

export default connect(mapStateToProps)(WeatherList);
