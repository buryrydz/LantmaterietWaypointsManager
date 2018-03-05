export const START_DRAW_WAYPOINT = 'START_DRAW_WAYPOINT';
export const END_DRAW_WAYPOINT = 'END_DRAW_WAYPOINT';

export function startDrawWaypoint() {
    return {
        type: START_DRAW_WAYPOINT
    }
}

export function endDrawWaypoint(newWaypoint) {
    return {
        type: END_DRAW_WAYPOINT,
        payload: newWaypoint
    }
}