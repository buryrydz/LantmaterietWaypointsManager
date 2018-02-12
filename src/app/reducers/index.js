import {combineReducers} from 'redux';
import WaypointsReducer from './reducer_waypoints';
import ActiveWaypointReducer from './reducer_active_waypoint';

const rootReducer = combineReducers({
    waypoints: WaypointsReducer,
    activeWaypoint: ActiveWaypointReducer
});

export default rootReducer;