import {combineReducers} from 'redux';
import  WaypointsReducer from './reducer_waypoints';

const rootReducer = combineReducers({
    waypoints: WaypointsReducer
});

export default rootReducer;