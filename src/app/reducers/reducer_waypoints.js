import {FETCH_WAYPOINTS} from '../actions/index';

export default function(state=[], action) {
    switch(action.type) {
        case FETCH_WAYPOINTS:
            return [...action.payload, ...state]; 
    }

    return state;
}