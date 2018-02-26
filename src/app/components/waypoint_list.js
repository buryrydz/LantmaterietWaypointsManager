import React, {Component} from 'react';
import {connect} from 'react-redux';
import WaypointListItem from './waypoint_list_item';
import WaypointListItemActive from './waypoint_list_item_active';

export default (props) => {
    function renderWaypoint(waypoint) {
        const waypointId = waypoint.waypointId;
        const activeWaypointId = props.activeWaypoint ? props.activeWaypoint.waypointId : -1;
        if (waypointId === activeWaypointId) {
            return (
                <WaypointListItemActive key={waypointId} waypoint={waypoint} />
            )
        } else {
            return (
                <WaypointListItem key={waypointId} waypoint={waypoint} />
            )
        }
    }

    return (
        <div>
            {props.waypoints.map(renderWaypoint)}
        </div>
    )
}