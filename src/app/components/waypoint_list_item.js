import React from 'react';

export default (props) => {
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