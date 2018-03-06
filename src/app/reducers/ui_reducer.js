import {
    START_DRAW_WAYPOINT, 
    END_DRAW_WAYPOINT, 
    START_IMPORT_WAYPOINTS, 
    END_IMPORT_WAYPOINTS,
    START_EXPORT_WAYPOINTS,
    END_EXPORT_WAYPOINTS,
    START_CLEAR_WAYPOINTS,
    END_CLEAR_WAYPOINTS} from '../actions/ui_actions';

const uiState = {
    addWaypointEnabled: false, 
    importWaypointsEnabled: false,
    exportWaypointsEnabled: false,
    clearWaypointsEnabled: false,
    changeWaypointNameEnabled: false,
    deleteWaypointEnabled: false
}

export default function(state=uiState, action) {
    switch(action.type) {
        case START_DRAW_WAYPOINT:
            return  Object.assign({}, state, {
                addWaypointEnabled: true
            });
        case END_DRAW_WAYPOINT:
            return  Object.assign({}, state, {
                addWaypointEnabled: false
            });
        case START_IMPORT_WAYPOINTS:
            return Object.assign({}, state, {
                importWaypointsEnabled: true
            });
        case END_IMPORT_WAYPOINTS:
            return Object.assign({}, state, {
                importWaypointsEnabled: false
            });
        case START_EXPORT_WAYPOINTS:
            return Object.assign({}, state, {
                exportWaypointsEnabled: true
            });
        case END_EXPORT_WAYPOINTS:
            return Object.assign({}, state, {
                exportWaypointsEnabled: false
            });
        case START_CLEAR_WAYPOINTS:
            return Object.assign({}, state, {
                clearWaypointsEnabled: true
            });
        case END_CLEAR_WAYPOINTS:
            return Object.assign({}, state, {
                clearWaypointsEnabled: false
            });
    }

    return state;
}
