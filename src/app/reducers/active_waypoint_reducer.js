import {SELECT_WAYPOINT} from '../actions/waypoints_actions';

export default function(state = null, action) {
    switch(action.type) {
        case SELECT_WAYPOINT: 
            return action.payload;
    }

    return state;
}