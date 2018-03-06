export const START_DRAW_WAYPOINT = 'START_DRAW_WAYPOINT';
export const END_DRAW_WAYPOINT = 'END_DRAW_WAYPOINT';
export const START_IMPORT_WAYPOINTS = 'START_IMPORT_WAYPOINTS';
export const END_IMPORT_WAYPOINTS = 'END_IMPORT_WAYPOINTS';
export const START_EXPORT_WAYPOINTS = 'START_EXPORT_WAYPOINTS';
export const END_EXPORT_WAYPOINTS = 'END_EXPORT_WAYPOINTS';
export const START_CLEAR_WAYPOINTS = 'START_CLEAR_WAYPOINTS'; 
export const END_CLEAR_WAYPOINTS = 'END_CLEAR_WAYPOINTS'; 

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

export function startImportWaypoints() {
    return {
        type: START_IMPORT_WAYPOINTS
    }
}

export function endImportWaypoints() {
    return {
        type: END_IMPORT_WAYPOINTS
    }
}

export function startExportWaypoints() {
    return {
        type: START_EXPORT_WAYPOINTS
    }
}

export function endExportWaypoints() {
    return {
        type: END_EXPORT_WAYPOINTS
    }
}

export function startClearWaypoints() {
    return {
        type: START_CLEAR_WAYPOINTS
    }
}

export function endClearWaypoints() {
    return {
        type: END_CLEAR_WAYPOINTS
    }
}