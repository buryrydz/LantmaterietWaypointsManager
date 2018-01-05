export const FETCH_WAYPOINTS = 'FETCH_WAYPOINTS'; 
export const SELECT_WAYPOINT = 'SELECT_WAYPOINT';

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