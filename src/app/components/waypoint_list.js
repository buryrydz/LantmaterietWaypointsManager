import React from 'react';
import WaypointListItem from './waypoint_list_item';
import WaypointListItemSelected from './waypoint_list_item_selected';

export default () => {
    return (
        <div>
            <div><WaypointListItemSelected waypointName='waypoint 1' /></div>
            <div><WaypointListItem waypointName='waypoint 2'/></div>
            <div><WaypointListItem waypointName='j3'/></div>
            <div><WaypointListItem waypointName='waypoint 3'/></div>
        </div>
    )
}