export const FETCH_WAYPOINTS = 'FETCH_WAYPOINTS'; 
export const SELECT_WAYPOINT = 'SELECT_WAYPOINT';
export const ADD_NEW_WAYPOINT = 'ADD_NEW_WAYPOINT';

export function fetchWaypoints(waypoints) {
    return {
        type: FETCH_WAYPOINTS,
        payload: waypoints
    }
}

export function selectWaypoint(waypoint) {
    return {
        type: SELECT_WAYPOINT,
        payload: waypoint
    }
}

export function addNewWaypoint(waypoint) {
    return {
        type: ADD_NEW_WAYPOINT,
        payload: waypoint
    }
}