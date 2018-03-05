import {FETCH_WAYPOINTS} from '../actions/waypoints_actions';
import {END_DRAW_WAYPOINT} from '../actions/ui_actions';

export default function(state=[], action) {
    switch(action.type) {
        case FETCH_WAYPOINTS:
            return [...action.payload, ...state];
        case END_DRAW_WAYPOINT:
            return [action.payload, ...state];
    }

    return state;
}