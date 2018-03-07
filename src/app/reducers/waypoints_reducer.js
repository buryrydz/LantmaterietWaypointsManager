import {FETCH_WAYPOINTS} from '../actions/waypoints_actions';
import {END_DRAW_WAYPOINT, END_CLEAR_WAYPOINTS, END_CHANGE_WAYPOINT_NAME, END_DELETE_WAYPOINT} from '../actions/ui_actions';

export default function(state=[], action) {
    switch(action.type) {
        case FETCH_WAYPOINTS:
            return [...action.payload, ...state];
        case END_DRAW_WAYPOINT:
            return [action.payload, ...state];
        case END_CLEAR_WAYPOINTS:
            return [];
        case END_CHANGE_WAYPOINT_NAME:
            return state.map((waypoint) => {
                if (waypoint.waypointId === action.waypointId) {
                    return Object.assign({}, waypoint, {
                        waypointName: action.newWaypointName
                    });
                }
                return waypoint;
            });
        case END_DELETE_WAYPOINT:
            return state.filter((waypoint) => {
                return waypoint.waypointId != action.waypointId;
            })
    }

    return state;
}