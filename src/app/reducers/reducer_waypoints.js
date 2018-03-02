import {FETCH_WAYPOINTS, ADD_NEW_WAYPOINT} from '../actions/index';

export default function(state=[], action) {
    switch(action.type) {
        case FETCH_WAYPOINTS:
            return [...action.payload, ...state];
        case ADD_NEW_WAYPOINT:
            return [action.payload, ...state];
    }

    return state;
}