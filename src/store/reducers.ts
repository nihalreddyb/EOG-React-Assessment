import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as telemetryOptionsReducer } from '../Features/TelemetrySelect/reducer';

export default {
  weather: weatherReducer,
  telemetryDataOptions: telemetryOptionsReducer
};
