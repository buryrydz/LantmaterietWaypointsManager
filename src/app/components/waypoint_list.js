import React, {Component} from 'react';
import {connect} from 'react-redux';
import WaypointListItem from './waypoint_list_item';
import WaypointListItemActive from '../containers/waypoint_list_item_active';

const WaypointList = (props) => {
    function renderWaypoint(waypoint) {
        const waypointId = waypoint.waypointId;
        const activeWaypointId = props.activeWaypoint ? props.activeWaypoint.waypointId : -1;
        if (waypointId === activeWaypointId) {
            return (
                <WaypointListItemActive 
                    key={waypointId} 
                    waypoint={waypoint} 
                    startChangeWaypointName={props.uiActions.startChangeWaypointName} 
                    startDeleteWaypoint={props.uiActions.startDeleteWaypoint}
                    startShowModal={props.modalActions.startShowModal}
                />
            )
        } else {
            return (
                <WaypointListItem 
                    key={waypointId} 
                    waypoint={waypoint} 
                    selectWaypoint={props.waypointsActions.selectWaypoint} 
                />
            )
        }
    }

    return (
        <div>
            {props.presentationalWaypoints.map(renderWaypoint)}
        </div>
    )
}

export default WaypointList;