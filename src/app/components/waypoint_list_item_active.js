import React from 'react';

const WaypointListItemActive = (props) => {
    return (
        <div className="input-group justify-content-between p-1">
            <input type="text" className="form-control" placeholder="waypoint's name" value={props.waypoint.waypointName} readOnly></input>
            <div className="input-group-append">
                <label className="btn btn-secondary" type="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></label>
                <label className="btn btn-secondary" type="button"><i className="fa fa-trash-o" aria-hidden="true"></i></label>
                <label className="btn btn-secondary" type="button"><i className="fa fa-star" aria-hidden="true"></i></label>
            </div>
        </div>
    )
}

export default WaypointListItemActive;