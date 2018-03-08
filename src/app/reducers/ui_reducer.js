import {
    START_DRAW_WAYPOINT, 
    END_DRAW_WAYPOINT, 
    START_IMPORT_WAYPOINTS, 
    END_IMPORT_WAYPOINTS,
    START_EXPORT_WAYPOINTS,
    END_EXPORT_WAYPOINTS,
    START_CLEAR_WAYPOINTS,
    END_CLEAR_WAYPOINTS,
    START_CHANGE_WAYPOINT_NAME,
    END_CHANGE_WAYPOINT_NAME,
    START_DELETE_WAYPOINT,
    END_DELETE_WAYPOINT} from '../actions/ui_actions';

const uiState = {
    addWaypointEnabled: false, 
    importWaypointsEnabled: false,
    exportWaypointsEnabled: false,
    clearWaypointsEnabled: false,
    changeWaypointNameEnabled: false,
    changedWaypointId: -1,
    changedWaypointNewName: "",
    deleteWaypointEnabled: false,
    deletedWaypointId: -1
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
        case START_CHANGE_WAYPOINT_NAME:
            return Object.assign({}, state, {
                changeWaypointNameEnabled: true,
                changedWaypointId: action.waypointId,
                changedWaypointNewName: action.newWaypointName
            });
        case END_CHANGE_WAYPOINT_NAME:
            return Object.assign({}, state, {
                changeWaypointNameEnabled: false
            });
        case START_DELETE_WAYPOINT:
            return Object.assign({}, state, {
                deleteWaypointEnabled: true,
                deletedWaypointId: action.waypointId
            })
        case END_DELETE_WAYPOINT:
            return Object.assign({}, state, {
                deleteWaypointEnabled: false
            })
    }

    return state;
}
