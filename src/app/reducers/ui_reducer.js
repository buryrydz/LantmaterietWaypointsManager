import {START_DRAW_WAYPOINT, END_DRAW_WAYPOINT} from '../actions/ui_actions';

const uiState = {
    addWaypointEnabled: false, 
    importWaypointsEnabled: false,
    exportWaypointsEnabled: false,
    clearWaypointsEnabled: false,
    changeWaypointNameEnabled: false,
    deleteWaypointEnabled: false
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
    }

    return state;
}
