import React from 'react';

const WaypointListItem = (props) => {
    return (
        <div className="input-group p-1">
            <button
                onClick={() => props.selectWaypoint(props.waypoint)} 
                className="btn btn-light btn-block" 
                type="button">
                    {props.waypoint.waypointName}
            </button>
        </div>
    )
}

export default WaypointListItem;