import {combineReducers} from 'redux';
import WaypointsReducer from './waypoints_reducer';
import ActiveWaypointReducer from './active_waypoint_reducer';
import UiReducer from './ui_reducer';
import ModalReducer from './modal_reducer';

const rootReducer = combineReducers({
    waypoints: WaypointsReducer,
    activeWaypoint: ActiveWaypointReducer,
    uiState: UiReducer,
    modalState: ModalReducer
});

export default rootReducer;