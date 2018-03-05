import {combineReducers} from 'redux';
import WaypointsReducer from './waypoints_reducer';
import ActiveWaypointReducer from './active_waypoint_reducer';
import UiReducer from './ui_reducer';

const rootReducer = combineReducers({
    waypoints: WaypointsReducer,
    activeWaypoint: ActiveWaypointReducer,
    uiState: UiReducer
});

export default rootReducer;