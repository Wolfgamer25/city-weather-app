import { combineReducers } from 'redux';
import WeatherReducers from './reducers_weather';

const rootReducer = combineReducers({
  weather: WeatherReducers
});

export default rootReducer;
